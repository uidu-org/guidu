import { MediaSingleLayout } from '@uidu/adf-schema';
import classnames from 'classnames';
import * as React from 'react';
import { calcPxFromPct, layoutSupportsWidth } from './grid';
import Wrapper from './styled';

export const DEFAULT_IMAGE_WIDTH = 250;
export const DEFAULT_IMAGE_HEIGHT = 200;

export interface Props {
  children: React.ReactNode;
  layout: MediaSingleLayout;
  width: number;
  height: number;
  containerWidth?: number;
  isLoading?: boolean;
  className?: string;
  lineLength: number;
  pctWidth?: number;
  fullWidthMode?: boolean;
}

export default function MediaSingle({
  children,
  layout,
  width,
  height,
  containerWidth = width,
  isLoading = false,
  pctWidth,
  lineLength,
  className,
  fullWidthMode,
}: Props) {
  const usePctWidth = pctWidth && layoutSupportsWidth(layout);
  if (pctWidth && usePctWidth) {
    const pxWidth = Math.ceil(
      calcPxFromPct(pctWidth / 100, lineLength || containerWidth),
    );

    // scale, keeping aspect ratio
    height = (height / width) * pxWidth;
    width = pxWidth;
  }

  return (
    <Wrapper
      layout={layout}
      width={width}
      height={height}
      containerWidth={containerWidth}
      pctWidth={pctWidth}
      fullWidthMode={fullWidthMode}
      data-node-type="mediaSingle"
      data-layout={layout}
      data-width={pctWidth}
      className={classnames('media-single', `image-${layout}`, className, {
        'is-loading': isLoading,
        'media-wrapped': layout === 'wrap-left' || layout === 'wrap-right',
      })}
    >
      {React.Children.only(children)}
    </Wrapper>
  );
}
