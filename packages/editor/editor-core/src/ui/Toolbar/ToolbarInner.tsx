import React from 'react';
import styled from 'styled-components';
import { ToolbarInnerProps } from './toolbar-types';

const ToolbarComponentsWrapper = styled.div`
  display: flex;
`;

export class ToolbarInner extends React.Component<ToolbarInnerProps> {
  shouldComponentUpdate(nextProps: ToolbarInnerProps) {
    return (
      nextProps.toolbarSize !== this.props.toolbarSize ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.popupsMountPoint === this.props.popupsMountPoint ||
      nextProps.popupsBoundariesElement ===
        this.props.popupsBoundariesElement ||
      nextProps.popupsScrollableElement ===
        this.props.popupsScrollableElement ||
      nextProps.isReducedSpacing !== this.props.isToolbarReducedSpacing
    );
  }

  render() {
    const {
      appearance,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      items,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      toolbarSize,
      disabled,
      isToolbarReducedSpacing,
      dispatchAnalyticsEvent,
    } = this.props;

    console.log('items', items);

    if (!items || !items.length) {
      return null;
    }

    return (
      <ToolbarComponentsWrapper>
        {items.map((component, key) => {
          const props: any = { key };
          const element = component({
            editorView,
            editorActions,
            eventDispatcher,
            providerFactory,
            appearance: appearance || 'full-page',
            popupsMountPoint,
            popupsBoundariesElement,
            popupsScrollableElement,
            disabled,
            toolbarSize,
            isToolbarReducedSpacing,
            containerElement: null,
            dispatchAnalyticsEvent,
          });
          console.log('element', element);
          return element && React.cloneElement(element, props);
        })}
      </ToolbarComponentsWrapper>
    );
  }
}
