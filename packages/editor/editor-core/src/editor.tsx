/* eslint-disable no-underscore-dangle */
import { CreateUIAnalyticsEvent } from '@uidu/analytics';
import {
  combineExtensionProviders,
  ExtensionProvider,
  ProviderFactory,
  Transformer,
} from '@uidu/editor-common';
import { EditorView } from 'prosemirror-view';
import React, { PureComponent } from 'react';
import { IntlContext, IntlShape } from 'react-intl';
import styled from 'styled-components';
import EditorActions from './actions';
import { ReactEditorView } from './create-editor';
import { EventDispatcher } from './event-dispatcher';
import { tableCommentEditorStyles } from './plugins/table/ui/styles';
import type { EditorProps } from './types/editor-props';
import ContentStyles from './ui/ContentStyles';
import EditorContext from './ui/EditorContext';
import PluginSlot from './ui/PluginSlot';
import { PortalProvider, PortalRenderer } from './ui/PortalProvider';
import Toolbar from './ui/Toolbar';
import {
  combineQuickInsertProviders,
  extensionProviderToQuickInsertProvider,
} from './utils/extensions';

export type {
  AllowedBlockTypes,
  Command,
  CommandDispatch,
  DomAtPos,
  EditorAppearance,
  EditorAppearanceComponentProps,
  EditorConfig,
  EditorInstance,
  EditorPlugin,
  EditorProps,
  ExtensionConfig,
  FeedbackInfo,
  MarkConfig,
  NodeConfig,
  NodeViewConfig,
  PluginsOptions,
  PMPlugin,
  PMPluginCreateConfig,
  PMPluginFactory,
  PMPluginFactoryParams,
  ReactComponents,
  ToolbarUIComponentFactory,
  ToolbarUiComponentFactoryParams,
  UIComponentFactory,
  UiComponentFactoryParams,
} from './types';

const GRID_GUTTER = 8;
const CommentEditorMargin = 14;
const CommentEditorSmallerMargin = 8;
const TableControlsPadding = 16;

const ContentArea = styled(ContentStyles)`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  /* line-height: initial; */

  /** Hack for Bitbucket to ensure entire editorView gets drop event; see ED-3294 **/
  /** Hack for tables controlls. Otherwise marging collapse and controlls are misplaced. **/
  .ProseMirror {
    // margin: -1rem 0rem 1rem;

    .ProseMirror-separator {
      margin: 0;
    }
  }

  .gridParent {
    margin-left: ${CommentEditorMargin - GRID_GUTTER}px;
    margin-right: ${CommentEditorMargin - GRID_GUTTER}px;
    width: calc(100% + ${CommentEditorMargin - GRID_GUTTER}px);
  }

  padding: 0 1.25rem;

  ${tableCommentEditorStyles};
`;

type Context = {
  editorActions?: EditorActions;
  intl: IntlShape;
};

export default class Editor extends PureComponent<EditorProps> {
  static contextTypes = {
    editorActions: {},
    intl: IntlContext,
  };

  private editorActions: EditorActions;

  private providerFactory: ProviderFactory;

  private createAnalyticsEvent?: CreateUIAnalyticsEvent;

  constructor(props: EditorProps, context: Context) {
    super(props);
    this.providerFactory = new ProviderFactory();
    this.onEditorCreated = this.onEditorCreated.bind(this);
    this.onEditorDestroyed = this.onEditorDestroyed.bind(this);
    this.editorActions = (context || {}).editorActions || new EditorActions();
  }

  componentDidMount() {
    this.handleProviders(this.props);
  }

  componentWillUnmount() {
    this.unregisterEditorFromActions();
    this.providerFactory.destroy();
  }

  private handleProviders(props: EditorProps) {
    const {
      emojiProvider,
      mentionProvider,
      tokenProvider,
      taskDecisionProvider,
      collabEditProvider,
      activityProvider,
      presenceProvider,
      macroProvider,
      collabEdit,
      mediaProvider,
      quickInsert,
      autoformattingProvider,
      extensionProviders,
    } = props;

    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.providerFactory.setProvider('tokenProvider', tokenProvider);
    this.providerFactory.setProvider(
      'taskDecisionProvider',
      taskDecisionProvider,
    );

    this.providerFactory.setProvider('mediaProvider', mediaProvider);
    this.providerFactory.setProvider(
      'collabEditProvider',
      collabEdit && collabEdit.provider
        ? collabEdit.provider
        : collabEditProvider,
    );
    this.providerFactory.setProvider('activityProvider', activityProvider);
    this.providerFactory.setProvider('presenceProvider', presenceProvider);
    this.providerFactory.setProvider('macroProvider', macroProvider);

    this.providerFactory.setProvider(
      'autoformattingProvider',
      autoformattingProvider,
    );

    let extensionProvider: ExtensionProvider | undefined;

    if (extensionProviders) {
      extensionProvider = combineExtensionProviders(extensionProviders);
      this.providerFactory.setProvider(
        'extensionProvider',
        Promise.resolve(extensionProvider),
      );
    }

    if (quickInsert && typeof quickInsert !== 'boolean') {
      const quickInsertProvider = extensionProvider
        ? combineQuickInsertProviders([
            quickInsert.provider,
            extensionProviderToQuickInsertProvider(
              extensionProvider,
              this.editorActions,
              this.createAnalyticsEvent,
            ),
          ])
        : quickInsert.provider;

      this.providerFactory.setProvider(
        'quickInsertProvider',
        quickInsertProvider,
      );
    }
  }

  onEditorCreated = (instance: {
    view: EditorView;
    eventDispatcher: EventDispatcher;
    transformer?: Transformer<string>;
  }) => {
    this.registerEditorForActions(
      instance.view,
      instance.eventDispatcher,
      instance.transformer,
    );
    const { onEditorReady } = this.props;
    if (onEditorReady) {
      onEditorReady(this.editorActions);
    }
    //  if (this.props.shouldFocus) {
    //    if (!instance.view.hasFocus()) {
    //      window.setTimeout(() => {
    //        instance.view.focus();
    //      }, 0);
    //    }
    //  }
  };

  onEditorDestroyed() {
    const { onDestroy } = this.props;
    this.unregisterEditorFromActions();

    if (onDestroy) {
      onDestroy();
    }
  }

  private registerEditorForActions = (
    editorView: EditorView,
    eventDispatcher: EventDispatcher,
    contentTransformer?: Transformer<string>,
  ) => {
    this.editorActions._privateRegisterEditor(
      editorView,
      eventDispatcher,
      contentTransformer,
    );
  };

  private unregisterEditorFromActions = () => {
    if (this.editorActions) {
      this.editorActions._privateUnregisterEditor();
    }
  };

  renderToolbar = ({ view, eventDispatcher, config }) => (
    <Toolbar
      disabled={this.props.disabled}
      editorView={view}
      editorActions={this.editorActions}
      eventDispatcher={eventDispatcher}
      items={config.primaryToolbarComponents}
      providerFactory={this.providerFactory}
      popupsMountPoint={this.props.popupsMountPoint}
      // popupsBoundariesElement={this.props.popupsBoundariesElement}
      // popupsScrollableElement={this.props.popupsScrollableElement}
    />
  );

  renderEditor = ({
    view,
    eventDispatcher,
    dispatchAnalyticsEvent,
    config,
    editor,
  }) => {
    const {
      popupsMountPoint,
      className,
      popupsBoundariesElement,
      popupsScrollableElement,
      containerElement,
      disabled,
    } = this.props;
    return (
      <ContentArea className={className}>
        <PluginSlot
          editorView={view}
          editorActions={this.editorActions}
          eventDispatcher={eventDispatcher}
          dispatchAnalyticsEvent={dispatchAnalyticsEvent}
          providerFactory={this.providerFactory}
          items={config.contentComponents}
          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
          popupsScrollableElement={popupsScrollableElement}
          containerElement={containerElement}
          disabled={!!disabled}
        />
        {editor}
      </ContentArea>
    );
  };

  render() {
    const { children, plugins, ...otherProps } = this.props;

    return (
      <EditorContext editorActions={this.editorActions}>
        <PortalProvider
          render={(portalProviderAPI) => (
            <>
              <ReactEditorView
                editorProps={{
                  appearance: 'full-page',
                  quickInsert: true,
                  plugins,
                  ...otherProps,
                }}
                // createAnalyticsEvent={createAnalyticsEvent}
                portalProviderAPI={portalProviderAPI}
                providerFactory={this.providerFactory}
                onEditorCreated={this.onEditorCreated}
                onEditorDestroyed={this.onEditorDestroyed}
                disabled={this.props.disabled}
                render={({
                  editor,
                  view,
                  eventDispatcher,
                  config,
                  dispatchAnalyticsEvent,
                }) =>
                  children({
                    view,
                    editor,
                    config,
                    dispatchAnalyticsEvent,
                    renderToolbar: (props) =>
                      this.renderToolbar({
                        view,
                        config,
                        eventDispatcher,
                        ...props,
                      }),
                    renderEditor: (props) =>
                      this.renderEditor({
                        editor,
                        view,
                        eventDispatcher,
                        dispatchAnalyticsEvent,
                        config,
                        ...props,
                      }),
                  })
                }
              />
              <PortalRenderer portalProviderAPI={portalProviderAPI} />
            </>
          )}
        />
      </EditorContext>
    );
  }
}
