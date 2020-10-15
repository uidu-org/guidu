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

export default function ItemField({ cell }) {
  return (
    <StyledItemField
      className="px-3 px-xl-4"
      // isSorterActive={sorters.map((s) => s.id).includes(column.id)}
      // isFilterActive={!!filterModel[column.id]}
    >
      <dt className="small text-muted text-truncate mb-1">
        <div className="customHeaderLabel flex-grow-1 text-truncate">
          {cell.column.headerComponentParams?.menuIcon && (
            <span className="mr-2 text-muted" style={{ opacity: 0.4 }}>
              {cell.column.headerComponentParams.menuIcon}
            </span>
          )}
          {cell.column.headerName}
        </div>
      </dt>
      <dd className="mb-0 text-truncate">{cell.render('Cell')}</dd>
    </StyledItemField>
  );
}
