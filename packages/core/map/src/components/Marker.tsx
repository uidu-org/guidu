import { ChildComponentProps } from 'google-map-react';
import React from 'react';
import styled, { css } from 'styled-components';

const K_WIDTH = 24;
const K_HEIGHT = 24;

const StyledMarker = styled.div<{ isHover?: boolean }>`
  position: absolute;
  width: ${() => `${K_WIDTH}px`};
  height: ${() => `${K_HEIGHT}px`};
  border-radius: 50% 50% 50% 0;
  background-color: rgb(255, 255, 255);
  border: 2px solid black;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.08) 0px 3px 8px;
  color: rgb(72, 72, 72);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  padding: 4px;
  transform: scale(1) translate(-50%, 50%) rotate(-45deg);
  transform-origin: left;
  left: 50%;
  position: absolute;
  bottom: 0px;
  pointer-events: auto;
  transition: transform 0.15s ease-out 0s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1) translate(-50%, 50%) rotate(-45deg);
    transform-origin: left;
    transition: background-color 0.15s transform 0.15s ease-out 0s;
    background-color: rgba(var(--brand-primary), 1);
  }

  ${({ isHover }) => {
    if (isHover) {
      return css`
        cursor: pointer;
        transform: scale(1.3) translate(-50%, 50%) rotate(-45deg);
        transform-origin: left;
        transition: background-color 0.15s transform 0.15s ease-out 0s;
        background-color: #3d64ff;
        z-index: 500;
      `;
    }
    return undefined;
  }}
`;

export type MarkerProps = {
  className: string | null;
  children?: any;
  isHover?: boolean;
} & ChildComponentProps;

export default function Marker({ children, isHover, className }: MarkerProps) {
  return (
    <StyledMarker className={className} isHover={isHover}>
      {children}
    </StyledMarker>
  );
}
