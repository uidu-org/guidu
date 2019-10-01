import * as React from 'react';
import styled from 'styled-components';
import {
  MaxContentSizePluginState,
  pluginKey as maxContentSizePluginKey,
} from '../../plugins/max-content-size';
import { mentionPluginKey } from '../../plugins/mentions';
import { EditorAppearance, EditorAppearanceComponentProps } from '../../types';
import { ClickAreaMobile as ClickArea } from '../Addon';
import ContentStyles from '../ContentStyles';
import PluginSlot from '../PluginSlot';
import WithFlash from '../WithFlash';
import WithPluginState from '../WithPluginState';

export interface MobileEditorProps {
  isMaxContentSizeReached?: boolean;
  maxHeight?: number;
}

const MobileEditor: any = styled.div`
  min-height: 30px;
  width: 100%;
  max-width: inherit;
  box-sizing: border-box;
  word-wrap: break-word;

  div > .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
  }
`;
MobileEditor.displayName = 'MobileEditor';
const ContentArea = styled(ContentStyles)``;
ContentArea.displayName = 'ContentArea';

export default class Editor extends React.Component<
  EditorAppearanceComponentProps,
  any
> {
  static displayName = 'MobileEditor';

  private appearance: EditorAppearance = 'mobile';
  private containerElement: HTMLElement | undefined;

  private handleRef = (ref: HTMLElement) => {
    this.containerElement = ref;
    if (this.props.onUiReady) {
      this.props.onUiReady(ref);
    }
  };

  private renderMobile = ({
    maxContentSize,
  }: {
    maxContentSize: MaxContentSizePluginState;
  }) => {
    const {
      editorView,
      eventDispatcher,
      providerFactory,
      customContentComponents,
      maxHeight,
      disabled,
      editorDOMElement,
      dispatchAnalyticsEvent,
    } = this.props;
    const maxContentSizeReached =
      maxContentSize && maxContentSize.maxContentSizeReached;
    return (
      <WithFlash animate={maxContentSizeReached}>
        <MobileEditor
          isMaxContentSizeReached={maxContentSizeReached}
          maxHeight={maxHeight}
        >
          <ClickArea editorView={editorView}>
            <ContentArea ref={this.handleRef}>
              {customContentComponents}
              <PluginSlot
                editorView={editorView}
                eventDispatcher={eventDispatcher}
                providerFactory={providerFactory}
                appearance={this.appearance}
                containerElement={this.containerElement}
                disabled={!!disabled}
                dispatchAnalyticsEvent={dispatchAnalyticsEvent}
              />
              {editorDOMElement}
            </ContentArea>
          </ClickArea>
        </MobileEditor>
      </WithFlash>
    );
  };

  render() {
    const { eventDispatcher, editorView } = this.props;

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          maxContentSize: maxContentSizePluginKey,
          mentions: mentionPluginKey,
        }}
        render={this.renderMobile}
      />
    );
  }
}
