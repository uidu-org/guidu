import {
  ProviderFactory,
  Transformer,
  WidthProvider,
} from '@uidu/editor-common';
import * as PropTypes from 'prop-types';
import { Node as PMNode, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { IntlContext, IntlProvider } from 'react-intl';
import {
  createPMPlugins,
  createSchema,
  processPluginsList,
} from '../../create-editor/create-editor';
import {
  createDispatch,
  Dispatch,
  EventDispatcher,
} from '../../event-dispatcher';
import { EditorActions } from '../../index';
import { EditorAppearanceComponentProps, EditorPlugin } from '../../types';
import EditorContext from '../../ui/EditorContext';
import {
  PortalProvider,
  PortalProviderAPI,
  PortalRenderer,
} from '../../ui/PortalProvider';
import { processRawValue } from '../../utils';
import {
  findChangedNodesFromTransaction,
  validateNodes,
} from '../../utils/nodes';
import { EditorContentProvider } from './EditorContent';

export type EditorProps = {
  plugins?: Array<EditorPlugin>;
  transformer?: (schema: Schema) => Transformer<string>;
  children?: React.ReactChild;

  // Set the default editor content.
  defaultValue?: string | object;

  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;

  disabled?: boolean;
  placeholder?: string;

  // Set for an on change callback.
  onChange?: (value: any, meta: { source: 'remote' | 'local' }) => void;

  // Set for an on save callback.
  onSave?: (value: any) => void;

  // Set for an on cancel callback.
  onCancel?: (value: any) => void;
};

export type EditorPropsExtended = EditorProps & {
  portalProviderAPI: PortalProviderAPI;
};

const {
  Provider: PresetProvider,
  Consumer: PresetConsumer,
} = React.createContext<Array<EditorPlugin>>([]);

export { PresetProvider };

export interface EditorSharedConfig {
  editorView: EditorView;
  eventDispatcher: EventDispatcher;
  dispatch: Dispatch;

  primaryToolbarComponents: EditorAppearanceComponentProps['primaryToolbarComponents'];
  contentComponents: EditorAppearanceComponentProps['contentComponents'];

  popupsMountPoint: EditorProps['popupsMountPoint'];
  popupsBoundariesElement: EditorProps['popupsBoundariesElement'];
  popupsScrollableElement: EditorProps['popupsScrollableElement'];
  providerFactory: EditorAppearanceComponentProps['providerFactory'];

  disabled: EditorProps['disabled'];
}

export class Editor extends React.Component<EditorProps> {
  render() {
    return (
      <PresetConsumer>
        {(plugins) => (
          <PortalProvider
            render={(portalProviderAPI) => (
              <IntlProvider locale="en">
                <>
                  <EditorInternal
                    {...this.props}
                    plugins={plugins}
                    portalProviderAPI={portalProviderAPI}
                  />
                  <PortalRenderer portalProviderAPI={portalProviderAPI} />
                </>
              </IntlProvider>
            )}
          />
        )}
      </PresetConsumer>
    );
  }
}

export class EditorInternal extends React.Component<
  EditorPropsExtended,
  EditorSharedConfig
> {
  editorActions: EditorActions;

  static contextTypes = {
    editorActions: PropTypes.object,
    intl: IntlContext,
  };

  constructor(props: EditorPropsExtended, context: any) {
    super(props);
    this.editorActions = (context || {}).editorActions || new EditorActions();
  }

  handleRef = (ref: HTMLDivElement | null) => {
    if (!ref) {
      return;
    }

    const eventDispatcher = new EventDispatcher();
    const providerFactory = new ProviderFactory();
    const dispatch = createDispatch(eventDispatcher);
    const editorConfig = processPluginsList(this.props.plugins || [], {});
    const schema = createSchema(editorConfig);
    const pmPlugins = createPMPlugins({
      editorConfig,
      schema,
      dispatch,
      eventDispatcher,
      props: {},
      portalProviderAPI: this.props.portalProviderAPI,
      providerFactory,
      reactContext: () => this.context,
      // @ts-ignore
      intl: this.props.intl,
      dispatchAnalyticsEvent: () => {},
    });
    const state = EditorState.create({
      schema,
      plugins: pmPlugins,
      doc: processRawValue(schema, this.props.defaultValue),
    });

    const editorView = new EditorView(
      { mount: ref },
      {
        state,
        dispatchTransaction: this.dispatchTransaction,
        // Disables the contentEditable attribute of the editor if the editor is disabled
        editable: (_state) => true,
        attributes: { 'data-gramm': 'false' },
      },
    );

    // Editor Shared Config
    this.setState({
      editorView,

      eventDispatcher,
      dispatch,

      primaryToolbarComponents: editorConfig.primaryToolbarComponents,
      contentComponents: editorConfig.contentComponents,

      popupsMountPoint: this.props.popupsMountPoint,
      popupsBoundariesElement: this.props.popupsBoundariesElement,
      popupsScrollableElement: this.props.popupsScrollableElement,

      disabled: this.props.disabled,
      providerFactory,
    });

    this.editorActions._privateRegisterEditor(editorView, eventDispatcher);
  };

  render() {
    return (
      <WidthProvider>
        <EditorContext editorActions={this.editorActions}>
          <EditorSharedConfigProvider value={this.state}>
            <EditorContentProvider value={this.handleRef}>
              {this.props.children}
            </EditorContentProvider>
          </EditorSharedConfigProvider>
        </EditorContext>
      </WidthProvider>
    );
  }

  private dispatchTransaction = (transaction: Transaction) => {
    const { editorView } = this.state;
    if (!editorView) {
      return;
    }

    const nodes: PMNode[] = findChangedNodesFromTransaction(transaction);
    if (validateNodes(nodes)) {
      // go ahead and update the state now we know the transaction is good

      const editorState = editorView.state.apply(transaction);
      editorView.updateState(editorState);
      const onChange = this.props.onChange;
      if (onChange && transaction.docChanged && this.editorActions) {
        // TODO we should re-visit this, this should NOT be async. Waiting for media pending tasks
        // should happen in teardown, not when getting the editors value.
        this.editorActions.getValue().then((value) => {
          onChange(value, { source: 'local' });
        });
      }
    } else {
      // TODO pipe analytics
      // const documents = {
      //   new: getDocStructure(transaction.doc),
      //   prev: getDocStructure(transaction.docs[0]),
      // };
      // analyticsService.trackEvent(
      //   'atlaskit.fabric.editor.invalidtransaction',
      //   { documents: JSON.stringify(documents) }, // V2 events don't support object properties
      // );
      // this.dispatchAnalyticsEvent({
      //   action: ACTION.DISPATCHED_INVALID_TRANSACTION,
      //   actionSubject: ACTION_SUBJECT.EDITOR,
      //   eventType: EVENT_TYPE.OPERATIONAL,
      //   attributes: {
      //     analyticsEventPayloads: transaction.getMeta(
      //       analyticsPluginKey,
      //     ) as AnalyticsEventPayloadWithChannel[],
      //     documents,
      //   },
      // });
    }
  };
}

const { Provider, Consumer } = React.createContext<EditorSharedConfig | null>(
  null,
);

export class EditorSharedConfigProvider extends React.Component<
  { value: EditorSharedConfig | null },
  any
> {
  static childContextTypes = {
    editorSharedConfig: PropTypes.object,
  };

  getChildContext() {
    return {
      editorSharedConfig: this.props.value,
    };
  }

  render() {
    return <Provider value={this.props.value}>{this.props.children}</Provider>;
  }
}

interface EditorSharedConfigConsumerProps {
  children: (value: EditorSharedConfig | null) => React.ReactNode | null;
}
export class EditorSharedConfigConsumer extends React.Component<
  EditorSharedConfigConsumerProps
> {
  static contextTypes = {
    editorSharedConfig: PropTypes.object,
  };

  render() {
    return (
      <Consumer>
        {(value) =>
          this.props.children(this.context.editorSharedConfig || value)
        }
      </Consumer>
    );
  }
}
