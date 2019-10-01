import { MediaSingleLayout } from '@uidu/adf-schema';
import {
  akEditorFullPageMaxWidth,
  akEditorFullWidthLayoutWidth,
  mapBreakpointToLayoutMaxWidth,
  MediaSingle as UIMediaSingle,
  WidthConsumer,
} from '@uidu/editor-common';
import * as React from 'react';
import { Component, ReactElement } from 'react';
import styled from 'styled-components';
import { FullPagePadding } from '../../ui/Renderer/style';
import { RendererAppearance } from '../../ui/Renderer/types';

export interface Props {
  children: ReactElement<any>;
  layout: MediaSingleLayout;
  width?: number;
  allowDynamicTextSizing?: boolean;
  rendererAppearance: RendererAppearance;
}

export interface State {
  width?: number;
  height?: number;
}

const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 200;

const ExtendedUIMediaSingle = styled(UIMediaSingle)`
  ${({ layout }) =>
    layout === 'full-width' || layout === 'wide'
      ? `
  margin-left: 50%;
  transform: translateX(-50%);
  `
      : ``} transition: all 0.1s linear;
`;

export default class MediaSingle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {}; // Need to initialize with empty state.
  }

  private onExternalImageLoaded = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    this.setState({
      width,
      height,
    });
  };

  render() {
    const { props } = this;

    const child = React.Children.only(
      React.Children.toArray<React.ReactElement>(props.children)[0],
    );

    let { width, height, type } = child.props;

    if (type === 'external') {
      const { width: stateWidth, height: stateHeight } = this.state;
      if (width === null) {
        width = stateWidth || DEFAULT_WIDTH;
      }
      if (height === null) {
        height = stateHeight || DEFAULT_HEIGHT;
      }
    }

    if (width === null) {
      width = DEFAULT_WIDTH;
      height = DEFAULT_HEIGHT;
    }

    // TODO: put appearance-based padding into theme instead
    const padding =
      this.props.rendererAppearance === 'full-page' ? FullPagePadding * 2 : 0;

    return (
      <WidthConsumer>
        {({ width: containerWidth, breakpoint }) => {
          const cardWidth = containerWidth;
          const cardHeight = (height / width) * cardWidth;
          const cardDimensions = {
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
          };

          const isFullWidth = this.props.rendererAppearance === 'full-width';

          const nonFullWidthSize =
            containerWidth - padding >= akEditorFullPageMaxWidth
              ? this.props.allowDynamicTextSizing
                ? mapBreakpointToLayoutMaxWidth(breakpoint)
                : akEditorFullPageMaxWidth
              : containerWidth - padding;

          const lineLength = isFullWidth
            ? Math.min(akEditorFullWidthLayoutWidth, containerWidth - padding)
            : nonFullWidthSize;

          return (
            <ExtendedUIMediaSingle
              layout={props.layout}
              width={width}
              height={height}
              containerWidth={containerWidth}
              lineLength={lineLength}
              pctWidth={props.width}
              fullWidthMode={isFullWidth}
            >
              {child}
            </ExtendedUIMediaSingle>
          );
        }}
      </WidthConsumer>
    );
  }
}
