import { CreateUIAnalyticsEvent } from '@uidu/analytics';
import {
  browser,
  ErrorReporter,
  getResponseEndTime,
  measureRender,
  ProviderFactory,
  startMeasure,
  stopMeasure,
  Transformer,
} from '@uidu/editor-common';
import * as PropTypes from 'prop-types';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
import { DirectEditorProps, EditorView } from 'prosemirror-view';
import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { analyticsService } from '../analytics';
import { createDispatch, Dispatch, EventDispatcher } from '../event-dispatcher';
import {
  ACTION,
  ACTION_SUBJECT,
  AnalyticsDispatch,
  AnalyticsEventPayload,
  DispatchAnalyticsEvent,
  EVENT_TYPE,
  fireAnalyticsEvent,
  FULL_WIDTH_MODE,
  getAnalyticsEventsFromTransaction,
  PLATFORMS,
} from '../plugins/analytics';
import { analyticsEventKey } from '../plugins/analytics/consts';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../plugins/editor-disabled';
import {
  createFeatureFlagsFromProps,
  getEnabledFeatureFlagKeys,
} from '../plugins/feature-flags-context/feature-flags-from-props';
import {
  EditorAppearance,
  EditorConfig,
  EditorPlugin,
  EditorProps,
} from '../types';
import { PortalProviderAPI } from '../ui/PortalProvider';
import { processRawValue } from '../utils';
import { getNodesCount } from '../utils/document';
import { getDocStructure, SimplifiedNode } from '../utils/document-logger';
import { isFullPage } from '../utils/is-full-page';
import {
  findChangedNodesFromTransaction,
  validateNodes,
  validNode,
} from '../utils/nodes';
import measurements from '../utils/performance/measure-enum';
import {
  createErrorReporter,
  createPMPlugins,
  initAnalytics,
  processPluginsList,
} from './create-editor';
import createPluginList from './create-plugins-list';
import { createSchema } from './create-schema';

export type EditorViewProps = WrappedComponentProps & {
  editorProps: EditorProps;
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
  providerFactory: ProviderFactory;
  portalProviderAPI: PortalProviderAPI;
  allowAnalyticsGASV3?: boolean;
  disabled?: boolean;
  render?: (props: {
    editor: JSX.Element;
    view?: EditorView;
    config: EditorConfig;
    eventDispatcher: EventDispatcher;
    transformer?: Transformer<string>;
    dispatchAnalyticsEvent: DispatchAnalyticsEvent;
  }) => JSX.Element;
  onEditorCreated: (instance: {
    view: EditorView;
    config: EditorConfig;
    eventDispatcher: EventDispatcher;
    transformer?: Transformer<string>;
  }) => void;
  onEditorDestroyed: (instance: {
    view: EditorView;
    config: EditorConfig;
    eventDispatcher: EventDispatcher;
    transformer?: Transformer<string>;
  }) => void;
};

function handleEditorFocus(view: EditorView): number | undefined {
  if (view.hasFocus()) {
    return undefined;
  }

  return window.setTimeout(() => {
    view.focus();
  }, 0);
}

class ReactEditorView<T = {}> extends React.Component<EditorViewProps & T> {
  view?: EditorView;

  eventDispatcher: EventDispatcher;

  contentTransformer?: Transformer<string>;

  config!: EditorConfig;

  editorState: EditorState;

  errorReporter: ErrorReporter;

  dispatch: Dispatch;

  analyticsEventHandler!: (payloadChannel: {
    payload: AnalyticsEventPayload;
    channel?: string;
  }) => void;

  static contextTypes = {
    getAnalyticsEventHandlers: PropTypes.func,
  };

  // ProseMirror is instantiated prior to the initial React render cycle,
  // so we allow transactions by default, to avoid discarding the initial one.
  private canDispatchTransactions = true;

  private focusTimeoutId: number | undefined;

  constructor(props: EditorViewProps & T) {
    super(props);

    this.eventDispatcher = new EventDispatcher();
    this.dispatch = createDispatch(this.eventDispatcher);
    this.errorReporter = createErrorReporter(
      props.editorProps.errorReporterHandler,
    );
    this.editorState = this.createEditorState({ props, replaceDoc: true });

    const { createAnalyticsEvent, allowAnalyticsGASV3 } = props;
    if (allowAnalyticsGASV3) {
      this.activateAnalytics(createAnalyticsEvent);
    }
    initAnalytics(props.editorProps.analyticsHandler);
    const featureFlags = createFeatureFlagsFromProps(this.props.editorProps);
    const featureFlagsEnabled = featureFlags
      ? getEnabledFeatureFlagKeys(featureFlags)
      : [];

    this.dispatchAnalyticsEvent({
      action: ACTION.STARTED,
      actionSubject: ACTION_SUBJECT.EDITOR,
      attributes: {
        platform: PLATFORMS.WEB,
        featureFlags: featureFlagsEnabled,
      },
      eventType: EVENT_TYPE.UI,
    });
  }

  private broadcastDisabled = (disabled: boolean) => {
    const editorView = this.view;
    if (editorView) {
      const tr = editorView.state.tr.setMeta(editorDisabledPluginKey, {
        editorDisabled: disabled,
      } as EditorDisabledPluginState);

      tr.setMeta('isLocal', true);
      editorView.dispatch(tr);
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps: EditorViewProps) {
    if (
      this.view &&
      this.props.editorProps.disabled !== nextProps.editorProps.disabled
    ) {
      this.broadcastDisabled(!!nextProps.editorProps.disabled);
      // Disables the contentEditable attribute of the editor if the editor is disabled
      this.view.setProps({
        editable: (_state) => !nextProps.editorProps.disabled,
      } as DirectEditorProps);

      if (
        !nextProps.editorProps.disabled &&
        nextProps.editorProps.shouldFocus
      ) {
        this.focusTimeoutId = handleEditorFocus(this.view);
      }
    }

    // Activate or deactivate analytics if change property
    if (this.props.allowAnalyticsGASV3 !== nextProps.allowAnalyticsGASV3) {
      if (nextProps.allowAnalyticsGASV3) {
        this.activateAnalytics(nextProps.createAnalyticsEvent);
      } else {
        this.deactivateAnalytics();
      }
    } else {
      // Allow analytics is the same, check if we receive a new create analytics prop
      if (
        this.props.allowAnalyticsGASV3 &&
        nextProps.createAnalyticsEvent !== this.props.createAnalyticsEvent
      ) {
        this.deactivateAnalytics(); // Deactivate the old one
        this.activateAnalytics(nextProps.createAnalyticsEvent); // Activate the new one
      }
    }

    const { appearance } = this.props.editorProps;
    const { appearance: nextAppearance } = nextProps.editorProps;
    if (nextAppearance !== appearance) {
      this.reconfigureState(nextProps);
      if (nextAppearance === 'full-width' || appearance === 'full-width') {
        this.dispatchAnalyticsEvent({
          action: ACTION.CHANGED_FULL_WIDTH_MODE,
          actionSubject: ACTION_SUBJECT.EDITOR,
          eventType: EVENT_TYPE.TRACK,
          attributes: {
            previousMode: this.formatFullWidthAppearance(appearance),
            newMode: this.formatFullWidthAppearance(nextAppearance),
          },
        });
      }
    }
  }

  formatFullWidthAppearance = (
    appearance: EditorAppearance | undefined,
  ): FULL_WIDTH_MODE => {
    if (appearance === 'full-width') {
      return FULL_WIDTH_MODE.FULL_WIDTH;
    }
    return FULL_WIDTH_MODE.FIXED_WIDTH;
  };

  reconfigureState = (props: EditorViewProps) => {
    if (!this.view) {
      return;
    }

    // We cannot currently guarentee when all the portals will have re-rendered during a reconfigure
    // so we blur here to stop ProseMirror from trying to apply selection to detached nodes or
    // nodes that haven't been re-rendered to the document yet.
    if (this.view.dom instanceof HTMLElement && this.view.hasFocus()) {
      this.view.dom.blur();
    }

    this.config = processPluginsList(
      this.getPlugins(
        props.editorProps,
        this.props.editorProps,
        props.createAnalyticsEvent,
      ),
    );

    const state = this.editorState;
    const plugins = createPMPlugins({
      schema: state.schema,
      dispatch: this.dispatch,
      errorReporter: this.errorReporter,
      editorConfig: this.config,
      eventDispatcher: this.eventDispatcher,
      providerFactory: props.providerFactory,
      portalProviderAPI: props.portalProviderAPI,
      reactContext: () => ({
        ...this.context,
        intl: this.props.intl,
      }),
      dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
    });

    const newState = state.reconfigure({ plugins });

    // need to update the state first so when the view builds the nodeviews it is
    // using the latest plugins
    this.view.updateState(newState);

    return this.view.update({ ...this.view.props, state: newState });
  };

  /**
   * Deactivate analytics event handler, if exist any.
   */
  deactivateAnalytics() {
    if (this.analyticsEventHandler) {
      this.eventDispatcher.off(analyticsEventKey, this.analyticsEventHandler);
    }
  }

  /**
   * Create analytics event handler, if createAnalyticsEvent exist
   * @param createAnalyticsEvent
   */
  activateAnalytics(createAnalyticsEvent?: CreateUIAnalyticsEvent) {
    if (createAnalyticsEvent) {
      this.analyticsEventHandler = fireAnalyticsEvent(createAnalyticsEvent);
      this.eventDispatcher.on(analyticsEventKey, this.analyticsEventHandler);
    }
  }

  componentDidMount() {
    // Transaction dispatching is already enabled by default prior to
    // mounting, but we reset it here, just in case the editor view
    // instance is ever recycled (mounted again after unmounting) with
    // the same key.
    // Although storing mounted state is an anti-pattern in React,
    // we do so here so that we can intercept and abort asynchronous
    // ProseMirror transactions when a dismount is imminent.
    this.canDispatchTransactions = true;
  }

  /**
   * Clean up any non-PM resources when the editor is unmounted
   */
  componentWillUnmount() {
    // We can ignore any transactions from this point onwards.
    // This serves to avoid potential runtime exceptions which could arise
    // from an async dispatched transaction after it's unmounted.
    this.canDispatchTransactions = false;

    this.eventDispatcher.destroy();

    clearTimeout(this.focusTimeoutId);

    if (this.view) {
      // Destroy the state if the Editor is being unmounted
      const editorState = this.view.state;
      editorState.plugins.forEach((plugin) => {
        const state = plugin.getState(editorState);
        if (state && state.destroy) {
          state.destroy();
        }
      });
    }
    // this.view will be destroyed when React unmounts in handleEditorViewRef
  }

  // Helper to allow tests to inject plugins directly
  getPlugins(
    editorProps: EditorProps,
    prevEditorProps?: EditorProps,
    createAnalyticsEvent?: CreateUIAnalyticsEvent,
  ): EditorPlugin[] {
    return createPluginList(editorProps, prevEditorProps, createAnalyticsEvent);
  }

  createEditorState = (options: {
    props: EditorViewProps;
    replaceDoc?: boolean;
  }) => {
    if (this.view) {
      /**
       * There's presently a number of issues with changing the schema of a
       * editor inflight. A significant issue is that we lose the ability
       * to keep track of a user's history as the internal plugin state
       * keeps a list of Steps to undo/redo (which are tied to the schema).
       * Without a good way to do work around this, we prevent this for now.
       */
      // eslint-disable-next-line no-console
      console.warn(
        'The editor does not support changing the schema dynamically.',
      );
      return this.editorState;
    }

    this.config = processPluginsList(
      this.getPlugins(
        options.props.editorProps,
        undefined,
        options.props.createAnalyticsEvent,
      ),
    );
    const schema = createSchema(this.config);

    const { contentTransformerProvider, defaultValue } =
      options.props.editorProps;

    const plugins = createPMPlugins({
      schema,
      dispatch: this.dispatch,
      errorReporter: this.errorReporter,
      editorConfig: this.config,
      eventDispatcher: this.eventDispatcher,
      providerFactory: options.props.providerFactory,
      portalProviderAPI: this.props.portalProviderAPI,
      reactContext: () => ({
        ...this.context,
        intl: this.props.intl,
      }),
      dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
    });

    this.contentTransformer = contentTransformerProvider
      ? contentTransformerProvider(schema)
      : undefined;

    let doc;
    if (options.replaceDoc) {
      doc = processRawValue(
        schema,
        defaultValue,
        options.props.providerFactory,
        options.props.editorProps.sanitizePrivateContent,
        this.contentTransformer,
      );
    }
    let selection: Selection | undefined;
    if (doc) {
      // ED-4759: Don't set selection at end for full-page editor - should be at start
      selection = isFullPage(options.props.editorProps.appearance)
        ? Selection.atStart(doc)
        : Selection.atEnd(doc);
    }
    // Workaround for ED-3507: When media node is the last element, scrollIntoView throws an error
    const patchedSelection = selection
      ? Selection.findFrom(selection.$head, -1, true) || undefined
      : undefined;

    return EditorState.create({
      schema,
      plugins,
      doc,
      selection: patchedSelection,
    });
  };

  private onEditorViewStateUpdated = ({
    transaction,
    oldEditorState,
    newEditorState,
  }: {
    transaction: Transaction;
    oldEditorState: EditorState;
    newEditorState: EditorState;
  }) => {
    this.config.onEditorViewStateUpdatedCallbacks.forEach((entry) => {
      startMeasure(`🦉 ${entry.pluginName}::onEditorViewStateUpdated`);
      entry.callback({ transaction, oldEditorState, newEditorState });
      stopMeasure(`🦉 ${entry.pluginName}::onEditorViewStateUpdated`);
    });
  };

  private dispatchTransaction = (transaction: Transaction) => {
    if (!this.view) {
      return;
    }

    startMeasure(`🦉 ReactEditorView::dispatchTransaction`);

    const nodes: PMNode[] = findChangedNodesFromTransaction(transaction);
    const changedNodesValid = validateNodes(nodes);

    if (changedNodesValid) {
      const oldEditorState = this.view.state;

      // go ahead and update the state now we know the transaction is good
      startMeasure(`🦉 EditorView::state::apply`);
      const editorState = this.view.state.apply(transaction);
      stopMeasure(`🦉 EditorView::state::apply`);

      startMeasure(`🦉 EditorView::updateState`);
      this.view.updateState(editorState);
      stopMeasure(`🦉 EditorView::updateState`);

      startMeasure(`🦉 EditorView::onEditorViewStateUpdated`);
      this.onEditorViewStateUpdated({
        transaction,
        oldEditorState,
        newEditorState: editorState,
      });
      stopMeasure(`🦉 EditorView::onEditorViewStateUpdated`);

      if (this.props.editorProps.onChange && transaction.docChanged) {
        const source = transaction.getMeta('isRemote') ? 'remote' : 'local';

        startMeasure(`🦉 ReactEditorView::onChange`);
        this.props.editorProps.onChange(this.view, { source });
        stopMeasure(`🦉 ReactEditorView::onChange`);
      }
      this.editorState = editorState;
    } else {
      const invalidNodes = nodes
        .filter((node) => !validNode(node))
        .map<SimplifiedNode | string>((node) => getDocStructure(node));

      analyticsService.trackEvent(
        'uidu.uidu.editor-core.invalidtransaction',
        { invalidNodes: JSON.stringify(invalidNodes) }, // V2 events don't support object properties
      );

      this.dispatchAnalyticsEvent({
        action: ACTION.DISPATCHED_INVALID_TRANSACTION,
        actionSubject: ACTION_SUBJECT.EDITOR,
        eventType: EVENT_TYPE.OPERATIONAL,
        attributes: {
          analyticsEventPayloads:
            getAnalyticsEventsFromTransaction(transaction),
          invalidNodes,
        },
      });
    }

    stopMeasure(`🦉 ReactEditorView::dispatchTransaction`, () => {});
  };

  getDirectEditorProps = (state?: EditorState): DirectEditorProps => ({
    state: state || this.editorState,
    dispatchTransaction: (tr: Transaction) => {
      // Block stale transactions:
      // Prevent runtime exeptions from async transactions that would attempt to
      // update the DOM after React has unmounted the Editor.
      if (this.canDispatchTransactions) {
        this.dispatchTransaction(tr);
      }
    },
    // Disables the contentEditable attribute of the editor if the editor is disabled
    editable: (_state) => !this.props.editorProps.disabled,
    attributes: { 'data-gramm': 'false' },
  });

  createEditorView = (node: HTMLDivElement) => {
    measureRender(measurements.PROSEMIRROR_RENDERED, (duration, startTime) => {
      if (this.view) {
        this.dispatchAnalyticsEvent({
          action: ACTION.PROSEMIRROR_RENDERED,
          actionSubject: ACTION_SUBJECT.EDITOR,
          attributes: {
            duration,
            startTime,
            nodes: getNodesCount(this.view.state.doc),
            ttfb: getResponseEndTime(),
          },
          eventType: EVENT_TYPE.OPERATIONAL,
        });
      }
    });

    // Creates the editor-view from this.editorState. If an editor has been mounted
    // previously, this will contain the previous state of the editor.
    this.view = new EditorView({ mount: node }, this.getDirectEditorProps());
  };

  handleEditorViewRef = (node: HTMLDivElement) => {
    if (!this.view && node) {
      this.createEditorView(node);
      const { view } = this;
      this.props.onEditorCreated({
        view,
        config: this.config,
        eventDispatcher: this.eventDispatcher,
        transformer: this.contentTransformer,
      });

      if (
        this.props.editorProps.shouldFocus &&
        view.props.editable &&
        view.props.editable(view.state)
      ) {
        this.focusTimeoutId = handleEditorFocus(view);
      }

      // Set the state of the EditorDisabled plugin to the current value
      this.broadcastDisabled(!!this.props.editorProps.disabled);

      // Force React to re-render so consumers get a reference to the editor view
      this.forceUpdate();
    } else if (this.view && !node) {
      // When the appearance is changed, React will call handleEditorViewRef with node === null
      // to destroy the old EditorView, before calling this method again with node === div to
      // create the new EditorView
      this.props.onEditorDestroyed({
        view: this.view,
        config: this.config,
        eventDispatcher: this.eventDispatcher,
        transformer: this.contentTransformer,
      });
      this.view.destroy(); // Destroys the dom node & all node views
      this.view = undefined;
    }
  };

  dispatchAnalyticsEvent = (payload: AnalyticsEventPayload): void => {
    if (this.props.allowAnalyticsGASV3 && this.eventDispatcher) {
      const dispatch: AnalyticsDispatch = createDispatch(this.eventDispatcher);
      dispatch(analyticsEventKey, {
        payload,
      });
    }
  };

  render() {
    const editor = (
      <div
        className={getUAPrefix()}
        key="ProseMirror"
        ref={this.handleEditorViewRef}
      />
    );
    return this.props.render
      ? this.props.render({
          editor,
          view: this.view,
          config: this.config,
          eventDispatcher: this.eventDispatcher,
          transformer: this.contentTransformer,
          dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
        })
      : editor;
  }
}

function getUAPrefix() {
  if (browser.chrome) {
    return 'ua-chrome';
  }
  if (browser.ie) {
    return 'ua-ie';
  }
  if (browser.gecko) {
    return 'ua-firefox';
  }

  return '';
}

export default injectIntl(ReactEditorView);
