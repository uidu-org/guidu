import {
  ErrorReporter,
  ProviderFactory,
  Transformer,
} from '@atlaskit/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { DirectEditorProps, EditorView } from 'prosemirror-view';
import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
import { analyticsService } from '../analytics';
import {
  createErrorReporter,
  createPMPlugins,
  createSchema,
  initAnalytics,
  processPluginsList,
} from '../create-editor/create-editor';
import createPluginList from '../create-editor/create-plugins-list';
import { createDispatch, Dispatch, EventDispatcher } from '../event-dispatcher';
import {
  ACTION,
  ACTION_SUBJECT,
  AnalyticsDispatch,
  analyticsEventKey,
  AnalyticsEventPayload,
  AnalyticsEventPayloadWithChannel,
  analyticsPluginKey,
  DispatchAnalyticsEvent,
  EVENT_TYPE,
  PLATFORMS,
} from '../plugins/analytics';
import { EditorConfig, EditorPlugin, EditorProps } from '../types';
import { getDocStructure } from '../utils/document-logger';
import { findChangedNodesFromTransaction, validateNodes } from '../utils/nodes';
import { PortalProviderAPI } from './PortalProvider';

export interface EditorViewProps {
  editorProps: EditorProps;
  // createAnalyticsEvent?: CreateUIAnalyticsEventSignature;
  providerFactory: ProviderFactory;
  portalProviderAPI: PortalProviderAPI;
  allowAnalyticsGASV3?: boolean;
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
}

export default class Editor extends PureComponent<any> {
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
    intl: intlShape,
  };

  constructor(props: EditorViewProps) {
    super(props);
    this.eventDispatcher = new EventDispatcher();
    this.dispatch = createDispatch(this.eventDispatcher);
    this.errorReporter = createErrorReporter(
      props.editorProps.errorReporterHandler,
    );
    this.editorState = this.createEditorState({
      props,
      replaceDoc: true,
    });

    // const { createAnalyticsEvent, allowAnalyticsGASV3 } = props;
    // if (allowAnalyticsGASV3) {
    //   this.activateAnalytics(createAnalyticsEvent);
    // }
    initAnalytics(props.editorProps.analyticsHandler);

    this.dispatchAnalyticsEvent({
      action: ACTION.STARTED,
      actionSubject: ACTION_SUBJECT.EDITOR,
      attributes: { platform: PLATFORMS.WEB },
      eventType: EVENT_TYPE.UI,
    });
  }

  // Helper to allow tests to inject plugins directly
  getPlugins(
    editorProps: EditorProps,
    //  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
  ): EditorPlugin[] {
    return createPluginList(editorProps);
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
        //  options.props.createAnalyticsEvent,
      ),
      options.props.editorProps,
    );
    const schema = createSchema(this.config);

    const {
      contentTransformerProvider,
      defaultValue,
    } = options.props.editorProps;

    const plugins = createPMPlugins({
      schema,
      dispatch: this.dispatch,
      errorReporter: this.errorReporter,
      editorConfig: this.config,
      props: options.props.editorProps,
      eventDispatcher: this.eventDispatcher,
      providerFactory: options.props.providerFactory,
      portalProviderAPI: this.props.portalProviderAPI,
      reactContext: () => this.context,
      dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
    });

    console.log(this.config);

    this.contentTransformer = contentTransformerProvider
      ? contentTransformerProvider(schema)
      : undefined;

    // let doc;
    // if (options.replaceDoc) {
    //   doc =
    //     this.contentTransformer && typeof defaultValue === 'string'
    //       ? this.contentTransformer.parse(defaultValue)
    //       : processRawValue(
    //           schema,
    //           defaultValue,
    //           options.props.providerFactory,
    //           options.props.editorProps.sanitizePrivateContent,
    //         );
    // }
    // let selection: Selection | undefined;
    // if (doc) {
    //   // ED-4759: Don't set selection at end for full-page editor - should be at start
    //   selection = isFullPage(options.props.editorProps.appearance)
    //     ? Selection.atStart(doc)
    //     : Selection.atEnd(doc);
    // }
    // // Workaround for ED-3507: When media node is the last element, scrollIntoView throws an error
    // const patchedSelection = selection
    //   ? Selection.findFrom(selection.$head, -1, true) || undefined
    //   : undefined;

    return EditorState.create({
      schema,
      plugins,
      // doc,
      // selection: patchedSelection,
    });
  };

  getDirectEditorProps = (state?: EditorState): DirectEditorProps => {
    return {
      state: state || this.editorState,
      dispatchTransaction: (transaction: Transaction) => {
        if (!this.view) {
          return undefined;
        }

        const nodes: PMNode[] = findChangedNodesFromTransaction(transaction);
        if (validateNodes(nodes)) {
          // go ahead and update the state now we know the transaction is good
          const editorState = this.view.state.apply(transaction);
          this.view.updateState(editorState);
          if (this.props.editorProps.onChange && transaction.docChanged) {
            this.props.editorProps.onChange(this.view);
          }
          this.editorState = editorState;
        } else {
          const documents = {
            new: getDocStructure(transaction.doc),
            prev: getDocStructure(transaction.docs[0]),
          };
          analyticsService.trackEvent(
            'atlaskit.fabric.editor.invalidtransaction',
            { documents: JSON.stringify(documents) }, // V2 events don't support object properties
          );
          this.dispatchAnalyticsEvent({
            action: ACTION.DISPATCHED_INVALID_TRANSACTION,
            actionSubject: ACTION_SUBJECT.EDITOR,
            eventType: EVENT_TYPE.OPERATIONAL,
            attributes: {
              analyticsEventPayloads: transaction.getMeta(
                analyticsPluginKey,
              ) as AnalyticsEventPayloadWithChannel[],
              documents,
            },
          });
        }
      },
      // Disables the contentEditable attribute of the editor if the editor is disabled
      editable: _state => !this.props.editorProps.disabled,
      attributes: { 'data-gramm': 'false' },
    };
  };

  createEditorView = (node: HTMLDivElement) => {
    // Creates the editor-view from this.editorState. If an editor has been mounted
    // previously, this will contain the previous state of the editor.
    this.view = new EditorView({ mount: node }, this.getDirectEditorProps());
  };

  handleEditorViewRef = node => {
    if (!this.view && node) {
      this.createEditorView(node);
      this.props.onEditorCreated({
        view: this.view!,
        config: this.config,
        eventDispatcher: this.eventDispatcher,
        transformer: this.contentTransformer,
      });

      // // Set the state of the EditorDisabled plugin to the current value
      // this.broadcastDisabled(!!this.props.editorProps.disabled);

      // // Force React to re-render so consumers get a reference to the editor view
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
    const { render } = this.props;
    const editor = <div ref={this.handleEditorViewRef}></div>;
    return render({
      editor,
      view: this.view,
      config: this.config,
      eventDispatcher: this.eventDispatcher,
    });
  }
}
