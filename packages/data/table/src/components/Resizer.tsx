import React from 'react';
import styled, { css } from 'styled-components';

const StyledResizer = styled.div<{ isResizing: boolean }>`
  display: inline-block;
  background: transparent;
  width: 2px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  z-index: 1;
  ${({ isResizing }) =>
    css`
      opacity: isResizing ? 1 : 0;
    `}
  &:hover {
    background-color: var(--primary);
  }
`;

export default function Resizer({ column }) {
  return (
    <StyledResizer
      {...column.getResizerProps({})}
      className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
    />
  );
}
