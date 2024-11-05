import Button, { ButtonGroup } from '@uidu/button';
import {
  akEditorMobileBreakoutPoint,
  WidthConsumer,
} from '@uidu/editor-common';
import { borderRadius, colors, gridSize } from '@uidu/theme';
import classnames from 'classnames';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import styled from 'styled-components';
import messages from '../../messages';
import { GRID_GUTTER } from '../../plugins/grid';
import {
  MaxContentSizePluginState,
  pluginKey as maxContentSizePluginKey,
} from '../../plugins/max-content-size';
import { stateKey as mediaPluginKey } from '../../plugins/media/pm-plugins/plugin-key';
import { MediaPluginState } from '../../plugins/media/pm-plugins/types';
import { tableCommentEditorStyles } from '../../plugins/table/ui/styles';
import { EditorAppearance, EditorAppearanceComponentProps } from '../../types';
import { ClickAreaBlock } from '../Addon';
import ContentStyles from '../ContentStyles';
import PluginSlot from '../PluginSlot';
import Toolbar from '../Toolbar';
import WidthEmitter from '../WidthEmitter';
import WithFlash from '../WithFlash';
import WithPluginState from '../WithPluginState';

export interface CommentEditorProps {
  isMaxContentSizeReached?: boolean;
  maxHeight?: number;
}
const CommentEditorMargin = 14;
const CommentEditorSmallerMargin = 8;

const CommentEditor: any = styled.div`
  display: flex;
  flex-direction: column;

  .less-margin .ProseMirror {
    margin: 12px ${CommentEditorSmallerMargin}px ${CommentEditorSmallerMargin}px;
  }

  min-width: 272px;
  /* Border + Toolbar + Footer + (Paragraph + ((Parahraph + Margin) * (DefaultLines - 1)) */
  /* calc(2px + 40px + 24px + ( 20px + (32px * 2))) */
  min-height: 150px;
  height: auto;
  ${(props: CommentEditorProps) =>
    props.maxHeight
      ? 'max-height: ' + props.maxHeight + 'px;'
      : ''} background-color: white;
  border: 1px solid ${colors.N40};
  box-sizing: border-box;
  border-radius: ${borderRadius()}px;

  max-width: inherit;
  word-wrap: break-word;
`;
CommentEditor.displayName = 'CommentEditor';
const TableControlsPadding = 20;

const MainToolbar = styled.div`
  position: relative;
  align-items: center;
  padding: ${gridSize()}px ${gridSize()}px 0;
  display: flex;
  height: auto;

  padding-left: ${TableControlsPadding}px;

  & > div > *:first-child {
    margin-left: 0;
  }

  .block-type-btn {
    padding-left: 0;
  }
`;
MainToolbar.displayName = 'MainToolbar';

const MainToolbarCustomComponentsSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  padding-right: ${TableControlsPadding}px;
  > div {
    display: flex;
    flex-shrink: 0;
  }
`;
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar';

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
ContentArea.displayName = 'ContentArea';

const SecondaryToolbar = styled.div`
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding: 12px 1px;
`;
SecondaryToolbar.displayName = 'SecondaryToolbar';

export interface EditorAppearanceComponentState {}

class Editor extends React.Component<
  EditorAppearanceComponentProps & WrappedComponentProps,
  EditorAppearanceComponentState
> {
  static displayName = 'CommentEditorAppearance';

  private appearance: EditorAppearance = 'comment';
  private containerElement: HTMLElement | null = null;

  private handleSave = () => {
    if (this.props.editorView && this.props.onSave) {
      this.props.onSave(this.props.editorView);
    }
  };

  private handleCancel = () => {
    if (this.props.editorView && this.props.onCancel) {
      this.props.onCancel(this.props.editorView);
    }
  };

  private renderChrome = ({
    maxContentSize,
    mediaState,
  }: {
    maxContentSize: MaxContentSizePluginState;
    mediaState: MediaPluginState;
  }) => {
    const {
      editorDOMElement,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      contentComponents,
      customContentComponents,
      customPrimaryToolbarComponents,
      primaryToolbarComponents,
      customSecondaryToolbarComponents,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      maxHeight,
      onSave,
      onCancel,
      disabled,
      intl,
    } = this.props;
    const maxContentSizeReached =
      maxContentSize && maxContentSize.maxContentSizeReached;
    return (
      <WithFlash animate={maxContentSizeReached}>
        <CommentEditor maxHeight={maxHeight} className="akEditor">
          <MainToolbar>
            <Toolbar
              editorView={editorView!}
              editorActions={editorActions}
              eventDispatcher={eventDispatcher!}
              providerFactory={providerFactory!}
              appearance={this.appearance}
              items={primaryToolbarComponents}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
              disabled={!!disabled}
            />
            <MainToolbarCustomComponentsSlot>
              {customPrimaryToolbarComponents}
            </MainToolbarCustomComponentsSlot>
          </MainToolbar>
          <ClickAreaBlock editorView={editorView}>
            <WidthConsumer>
              {({ width }) => {
                return (
                  <ContentArea
                    ref={(ref) => (this.containerElement = ref)}
                    className={classnames('ak-editor-content-area', {
                      'less-margin': width < akEditorMobileBreakoutPoint,
                    })}
                  >
                    {customContentComponents}
                    <PluginSlot
                      editorView={editorView}
                      editorActions={editorActions}
                      eventDispatcher={eventDispatcher}
                      providerFactory={providerFactory}
                      appearance={this.appearance}
                      items={contentComponents}
                      popupsMountPoint={popupsMountPoint}
                      popupsBoundariesElement={popupsBoundariesElement}
                      popupsScrollableElement={popupsScrollableElement}
                      containerElement={this.containerElement}
                      disabled={!!disabled}
                    />
                    {editorDOMElement}
                  </ContentArea>
                );
              }}
            </WidthConsumer>
          </ClickAreaBlock>
          <WidthEmitter editorView={editorView!} />
        </CommentEditor>
        <SecondaryToolbar>
          <ButtonGroup>
            {!!onSave && (
              <Button
                appearance="primary"
                onClick={this.handleSave}
                isDisabled={
                  disabled || (mediaState && !mediaState.allUploadsFinished)
                }
              >
                {intl.formatMessage(messages.saveButton)}
              </Button>
            )}
            {!!onCancel && (
              <Button
                appearance="subtle"
                onClick={this.handleCancel}
                isDisabled={disabled}
              >
                {intl.formatMessage(messages.cancelButton)}
              </Button>
            )}
          </ButtonGroup>
          <span style={{ flexGrow: 1 }} />
          {customSecondaryToolbarComponents}
        </SecondaryToolbar>
      </WithFlash>
    );
  };

  render() {
    return (
      <WithPluginState
        plugins={{
          maxContentSize: maxContentSizePluginKey,
          mediaState: mediaPluginKey,
        }}
        render={this.renderChrome}
      />
    );
  }
}

export default injectIntl(Editor);
