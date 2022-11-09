import { ColumnSizingInfoState, Header } from '@tanstack/react-table';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const StyledResizer = styled.div<{ isResizing: boolean }>`
  ${tw`w-1 h-full absolute top-0 right-0 [user-select:none] [cursor:col-resize] [touch-action:none] hover:opacity-100 z-20`}
  ${({ isResizing }) =>
    isResizing
      ? tw`[background-color:rgba(var(--brand-primary), .5)] opacity-100`
      : tw``}
`;

export default function Resizer<T>({
  columnSizingInfo,
  header,
}: {
  columnSizingInfo: ColumnSizingInfoState;
  header: Header<T, unknown>;
}) {
  return (
    <StyledResizer
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      isResizing={header.column.getIsResizing()}
      className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
      style={{
        transform: header.column.getIsResizing()
          ? `translateX(${columnSizingInfo.deltaOffset}px)`
          : '',
      }}
    />
  );
}
