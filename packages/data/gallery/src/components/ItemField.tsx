import { valueRenderer } from '@uidu/table';
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

export default function ItemField({ sorters, filterModel, column, item }) {
  return (
    <StyledItemField
      className="px-3 px-xl-4"
      isSorterActive={sorters.map(s => s.colId).includes(column.colId)}
      isFilterActive={!!filterModel[column.colId]}
      key={`${item.data.id}-${column.field}-name`}
    >
      <dt className="small text-muted text-truncate mb-1">
        {column.headerComponentParams &&
        column.headerComponentParams.menuIcon ? (
          <span className="mr-2">{column.headerComponentParams.menuIcon}</span>
        ) : null}
        {column.headerName}
      </dt>
      <dd className="mb-0 text-truncate">{valueRenderer(item.data, column)}</dd>
    </StyledItemField>
  );
}
