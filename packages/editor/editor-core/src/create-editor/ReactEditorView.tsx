import { browser, ErrorReporter, ProviderFactory } from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
import { DirectEditorProps, EditorView } from 'prosemirror-view';
import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { createDispatch, Dispatch, EventDispatcher } from '../event-dispatcher';
import {
  EditorDisabledPluginState,
  pluginKey as editorDisabledPluginKey,
} from '../plugins/editor-disabled';
import { EditorConfig, EditorProps } from '../types';
import { PortalProviderAPI } from '../ui/PortalProvider';
import { processRawValue } from '../utils';
import { getDocStructure, SimplifiedNode } from '../utils/document-logger';
import { isFullPage } from '../utils/is-full-page';
import {
  findChangedNodesFromTransaction,
  validateNodes,
  validNode,
} from '../utils/nodes';
import {
  createErrorReporter,
  createPMPlugins,
  processPluginsList,
} from './create-editor';
import createPluginList from './create-plugins-list';
import { createSchema } from './create-schema';

export type EditorViewProps = WrappedComponentProps & {
  editorProps: EditorProps;
  providerFactory: ProviderFactory;
  portalProviderAPI: PortalProviderAPI;
  disabled?: boolean;
  render?: (props: {
    editor: JSX.Element;
    view?: EditorView;
    config: EditorConfig;
    eventDispatcher: EventDispatcher;
    transformer?: Transformer<string>;
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
  }

  getEditorState = () => this.view?.state;
  getEditorView = () => this.view;

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
      createPluginList(options.props.editorProps),
    );
    console.log(console.log('editorConfig', this.config));
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
      entry.callback({ transaction, oldEditorState, newEditorState });
    });
  };

  private dispatchTransaction = (transaction: Transaction) => {
    if (!this.view) {
      return;
    }

    const nodes: PMNode[] = findChangedNodesFromTransaction(transaction);
    const changedNodesValid = validateNodes(nodes);

    if (changedNodesValid) {
      const oldEditorState = this.view.state;

      const editorState = this.view.state.apply(transaction);
      this.view.updateState(editorState);
      this.onEditorViewStateUpdated({
        transaction,
        oldEditorState,
        newEditorState: editorState,
      });

      if (this.props.editorProps.onChange && transaction.docChanged) {
        const source = transaction.getMeta('isRemote') ? 'remote' : 'local';
        this.props.editorProps.onChange(this.view, { source });
      }
      this.editorState = editorState;
    } else {
      const invalidNodes = nodes
        .filter((node) => !validNode(node))
        .map<SimplifiedNode | string>((node) => getDocStructure(node));
      console.log('invalidNodes', invalidNodes);
    }
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
