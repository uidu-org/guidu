import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import Item from './Item';

const ItemWrapper = styled.div``;

const ItemField = styled.div<{
  isSorterActive: boolean;
  isFilterActive: boolean;
}>`
  height: 56px;
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

export default class GalleryItem extends PureComponent<any> {
  render() {
    const { columnIndex, rowIndex, style, data } = this.props;
    const {
      items,
      gutterSize,
      onItemClick,
      columnDefs,
      primary,
      cover,
      avatar,
      sorters,
      filterModel,
    } = data;
    const item = items[rowIndex] && items[rowIndex][columnIndex];

    if (!item) {
      return null;
    }

    return (
      <div
        onClick={e => {
          e.preventDefault();
          onItemClick({ data: item.data });
        }}
        style={{
          ...style,
          cursor: 'pointer',
          left: style.left,
          top: style.top,
          width: style.width,
          height: style.height - gutterSize,
        }}
        key={item.data.id}
      >
        <div
          className="card bg-white shadow-sm"
          style={{
            marginLeft: gutterSize / 2,
            marginRight: gutterSize / 2,
          }}
        >
          <Item
            item={item}
            columnDefs={columnDefs}
            primary={primary}
            cover={cover}
            avatar={avatar}
            sorters={sorters}
            filterModel={filterModel}
          />
        </div>
      </div>
    );
  }
}
