import { FileIdentifier } from '@uidu/media-core';
import styled, { css } from 'styled-components';

export function getCSSUnitValue(value: number | string): string {
  return typeof value === 'string' ? value : `${value}px`;
}

export const Overlay = styled.div<{ kind: string }>`
  background-color: rgba(10, 10, 10, 0.2);
  border-radius: 0.1rem;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0; /* ${({ kind }) => (kind === 'image' ? 0 : '25%')}; */
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px;
  transition: opacity 100ms ease-in;
  will-change: opacity;
  pointer-events: none;
`;

export const OverlayFilename = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
  font-size: 80%;

  img {
    width: 100%;
  }
`;

export interface WrapperProps {
  shouldUsePointerCursor?: boolean;
  dimensions?: {
    width: FileIdentifier['metadata']['width'];
    height: FileIdentifier['metadata']['height'];
  };
  // appearance?: CardAppearance;
  // breakpointSize?: BreakpointSizeValue;
}

const getWrapperHeight = (dimensions) =>
  dimensions && dimensions.height
    ? css`
        height: ${getCSSUnitValue(dimensions.height)};
        max-height: 100%;
      `
    : '';

const getWrapperWidth = (dimensions) =>
  dimensions && dimensions.width
    ? css`
        width: ${getCSSUnitValue(dimensions.width)};
        max-width: 100%;
      `
    : '';

export const Wrapper = styled.div<WrapperProps>`
  ${({ dimensions, shouldUsePointerCursor }) => {
    return css`
      ${getWrapperHeight(dimensions)}
      ${getWrapperWidth(dimensions)}
      cursor: ${shouldUsePointerCursor ? 'pointer' : 'default'};
    `;
  }};

  &:hover {
    ${Overlay} {
      pointer-events: initial;
      opacity: 1;
      transition: opacity 300ms ease;
    }
  }

  .wrapper {
    display: block;
    height: inherit;
    position: relative;

    .img-wrapper {
      position: relative;
      width: inherit;
      height: inherit;
      display: block;
      overflow: hidden;

      img {
        border-radius: 0.25rem;
        margin: 0;
      }
    }
  }
`;

Wrapper.displayName = 'CardViewWrapper';
