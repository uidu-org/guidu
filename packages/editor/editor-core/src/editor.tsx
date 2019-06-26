import { ProviderFactory, Transformer } from '@uidu/editor-common';
import { EditorView } from 'prosemirror-view';
import React, { PureComponent } from 'react';
import { IntlProvider, IntlShape, intlShape } from 'react-intl';
import styled from 'styled-components';
import EditorActions from './actions';
import ContentStyles from './components/ContentStyles';
import ReactEditorView from './components/Editor';
import EditorContext from './components/EditorContext';
import PluginSlot from './components/PluginSlot';
import { PortalProvider, PortalRenderer } from './components/PortalProvider';
import Toolbar from './components/Toolbar';
import { EventDispatcher } from './event-dispatcher';
import { tableCommentEditorStyles } from './plugins/table/ui/styles';
import { EditorProps } from './types/editor-props';

const GRID_GUTTER = 8;
const CommentEditorMargin = 14;
const CommentEditorSmallerMargin = 8;
const TableControlsPadding = 16;

const ContentArea = styled(ContentStyles)`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 24px;

  /** Hack for Bitbucket to ensure entire editorView gets drop event; see ED-3294 **/
  /** Hack for tables controlls. Otherwise marging collapse and controlls are misplaced. **/
  .ProseMirror {
    margin: 12px ${CommentEditorMargin}px ${CommentEditorMargin}px;
  }

  .gridParent {
    margin-left: ${CommentEditorMargin - GRID_GUTTER}px;
    margin-right: ${CommentEditorMargin - GRID_GUTTER}px;
    width: calc(100% + ${CommentEditorMargin - GRID_GUTTER}px);
  }

  padding: ${TableControlsPadding}px;

  ${tableCommentEditorStyles};
`;

type Context = {
  editorActions?: EditorActions;
  intl: IntlShape;
};

export default class Editor extends PureComponent<EditorProps> {
  static contextTypes = {
    editorActions: {},
    intl: intlShape,
  };

  private editorActions: EditorActions;
  private providerFactory: ProviderFactory;

  constructor(props: EditorProps, context: Context) {
    super(props);
    this.providerFactory = new ProviderFactory();
    //  this.deprecationWarnings(props);
    //  this.onEditorCreated = this.onEditorCreated.bind(this);
    //  this.onEditorDestroyed = this.onEditorDestroyed.bind(this);
    this.editorActions =
      (context || ({} as any)).editorActions || new EditorActions();
  }

  componentWillUnmount() {
    this.unregisterEditorFromActions();
    //  this.providerFactory.destroy();
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
    if (this.props.shouldFocus) {
      if (!instance.view.hasFocus()) {
        window.setTimeout(() => {
          instance.view.focus();
        }, 0);
      }
    }
  };

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

  onEditorDestroyed = (_instance: {
    view: EditorView;
    transformer?: Transformer<string>;
  }) => {
    this.unregisterEditorFromActions();
  };

  renderToolbar = ({ view, eventDispatcher, config }) => {
    return (
      <Toolbar
        appearance={this.props.appearance}
        disabled={this.props.disabled}
        editorView={view!}
        editorActions={this.editorActions}
        eventDispatcher={eventDispatcher}
        items={config.primaryToolbarComponents}
        providerFactory={this.providerFactory}
        popupsMountPoint={this.props.popupsMountPoint}
        // popupsBoundariesElement={this.props.popupsBoundariesElement}
        // popupsScrollableElement={this.props.popupsScrollableElement}
      ></Toolbar>
    );
  };

  renderEditor = ({
    view,
    eventDispatcher,
    dispatchAnalyticsEvent,
    config,
    editor,
  }) => (
    <ContentArea>
      <PluginSlot
        editorView={view!}
        editorActions={this.editorActions}
        eventDispatcher={eventDispatcher}
        dispatchAnalyticsEvent={dispatchAnalyticsEvent}
        providerFactory={this.providerFactory}
        appearance={this.props.appearance}
        items={config.contentComponents}
        popupsMountPoint={this.props.popupsMountPoint}
        popupsBoundariesElement={this.props.popupsBoundariesElement}
        popupsScrollableElement={this.props.popupsScrollableElement}
        containerElement={this.props.containerElement}
        disabled={!!this.props.disabled}
      />
      {editor}
    </ContentArea>
  );

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <IntlProvider locale="en">
        <EditorContext editorActions={this.editorActions}>
          <PortalProvider
            render={portalProviderAPI => (
              <>
                <ReactEditorView
                  editorProps={{
                    appearance: 'comment',
                    allowTextAlignment: true,
                    allowTextColor: true,
                    allowLists: true,
                    allowTables: true,
                    quickInsert: true,
                    allowLayouts: true,
                    allowIndentation: true,
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
                      renderToolbar: props =>
                        this.renderToolbar({
                          view,
                          config,
                          eventDispatcher,
                          ...props,
                        }),
                      renderEditor: props =>
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
          ></PortalProvider>
        </EditorContext>
      </IntlProvider>
    );
  }
}
