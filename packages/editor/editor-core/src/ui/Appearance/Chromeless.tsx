import React from 'react';
import styled from 'styled-components';
import {
  MaxContentSizePluginState,
  pluginKey as maxContentSizePluginKey,
} from '../../plugins/max-content-size';
import { EditorAppearance, EditorAppearanceComponentProps } from '../../types';
import ContentStyles from '../ContentStyles';
import PluginSlot from '../PluginSlot';
import { scrollbarStyles } from '../styles';
import WithFlash from '../WithFlash';
import WithPluginState from '../WithPluginState';

export interface ChromelessEditorProps {
  isMaxContentSizeReached?: boolean;
  maxHeight?: number;
}

const ChromelessEditor: any = styled.div`
  line-height: 20px;
  height: auto;
  min-height: 30px;
  ${(props: ChromelessEditorProps) =>
    props.maxHeight
      ? 'max-height: ' + props.maxHeight + 'px;'
      : ''} overflow-x: hidden;
  overflow-y: auto;
  ${scrollbarStyles} max-width: inherit;
  box-sizing: border-box;
  word-wrap: break-word;

  div > .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
  }
`;
ChromelessEditor.displayName = 'ChromelessEditor';

const ContentArea = styled(ContentStyles)``;
ContentArea.displayName = 'ContentArea';

export default class Editor extends React.Component<
  EditorAppearanceComponentProps,
  any
> {
  static displayName = 'ChromelessEditorAppearance';

  private appearance: EditorAppearance = 'chromeless';
  private containerElement: HTMLElement | null = null;

  private renderChrome = ({
    maxContentSize,
  }: {
    maxContentSize: MaxContentSizePluginState;
  }) => {
    const {
      editorDOMElement,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      contentComponents,
      customContentComponents,
      maxHeight,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      disabled,
      dispatchAnalyticsEvent,
    } = this.props;
    const maxContentSizeReached =
      maxContentSize && maxContentSize.maxContentSizeReached;

    return (
      <WithFlash animate={maxContentSizeReached}>
        <ChromelessEditor
          maxHeight={maxHeight}
          innerRef={(ref: HTMLElement | null) => (this.containerElement = ref)}
        >
          <ContentArea>
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
              dispatchAnalyticsEvent={dispatchAnalyticsEvent}
            />
            {editorDOMElement}
          </ContentArea>
        </ChromelessEditor>
      </WithFlash>
    );
  };

  render() {
    return (
      <WithPluginState
        plugins={{ maxContentSize: maxContentSizePluginKey }}
        render={this.renderChrome}
      />
    );
  }
}
