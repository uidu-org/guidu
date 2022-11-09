import { Cell, flexRender } from '@tanstack/react-table';
import React from 'react';
import styled, { css } from 'styled-components';

const StyledItemField = styled.div<{
  isSorterActive: boolean;
  isFilterActive: boolean;
}>`
  height: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  font-size: 0.9375rem;

  ${({ isSorterActive, isFilterActive }) => {
    if (isSorterActive) {
      if (isFilterActive) {
        return css`
          &:before {
            content: ' ';
            position: absolute;
            top: 0px;
            left: 0px;
            bottom: 0px;
            border-left: 3px solid #d1f7c4;
          }
          &:after {
            content: ' ';
            position: absolute;
            top: 0px;
            left: 3px;
            bottom: 0px;
            border-left: 3px solid #fee2d5;
          }
        `;
      }
      return css`
        &:before {
          content: ' ';
          position: absolute;
          top: 0px;
          left: 0px;
          bottom: 0px;
          border-left: 3px solid #fee2d5;
        }
      `;
    }
    if (isFilterActive) {
      return css`
        &:after {
          content: ' ';
          position: absolute;
          top: 0px;
          left: 0px;
          bottom: 0px;
          border-left: 3px solid #d1f7c4;
        }
      `;
    }
    return null;
  }}
`;

export default function ItemField<T>({ cell }: { cell: Cell<T, unknown> }) {
  return (
    <StyledItemField
      tw="px-3 xl:px-4"
      // isSorterActive={sorters.map((s) => s.id).includes(column.id)}
      // isFilterActive={!!filterModel[column.id]}
    >
      <dt tw="text-sm [color:rgb(var(--body-secondary-color))] truncate mb-2">
        <div tw="flex-grow truncate">
          {cell.column.columnDef.meta?.icon && (
            <span tw="mr-2 [color:rgb(var(--body-secondary-color))] opacity-40">
              {cell.column.columnDef.meta?.icon}
            </span>
          )}
          {cell.column.columnDef.meta?.name}
        </div>
      </dt>
      <dd tw="flex">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </dd>
    </StyledItemField>
  );
}
