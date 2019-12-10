import { valueRenderer } from '@uidu/table';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import ItemHeader from './ItemHeader';

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

export default class Item extends PureComponent<any> {
  render() {
    const { columnIndex, rowIndex, style, data } = this.props;
    const {
      items,
      columnDefs,
      gutterSize,
      onItemClick,
      primary,
      cover,
      avatar,
      sorters,
      groupers,
      filterModel,
    } = data;
    const item = items[rowIndex] && items[rowIndex][columnIndex];
    if (!item) {
      return null;
    }

    const visibleColumns = columnDefs.filter(
      column =>
        column.viewType !== 'cover' &&
        column.viewType !== 'primary' &&
        column.viewType !== 'avatar',
    );

    return (
      <div
        onClick={e => {
          e.preventDefault();
          onItemClick(item.data);
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
          <ItemHeader cover={cover} avatar={avatar} item={item} />
          <div className="py-3">
            {primary && (
              <div
                className="card-header border-0 d-flex align-items-center"
                style={{ fontWeight: 500, height: 42 }}
              >
                <span className="text-truncate">
                  {primary.valueGetter
                    ? primary.valueGetter({
                        data: item.data,
                        value: data[primary.field],
                      })
                    : data[primary.field]}
                </span>
              </div>
            )}
            {visibleColumns.length > 0 && (
              <dl className="mb-0">
                {visibleColumns.map(column => {
                  console.log(column.colId);
                  return (
                    <ItemField
                      className="px-3 px-xl-4"
                      isSorterActive={sorters
                        .map(s => s.colId)
                        .includes(column.colId)}
                      isFilterActive={!!filterModel[column.colId]}
                    >
                      <dt
                        className="small text-muted text-truncate"
                        key={`${item.data.id}-${column.field}-name`}
                      >
                        {column.headerComponentParams &&
                        column.headerComponentParams.menuIcon ? (
                          <span className="mr-2">
                            {column.headerComponentParams.menuIcon}
                          </span>
                        ) : null}
                        {column.headerName}
                      </dt>
                      <dd
                        className="mb-0 text-truncate"
                        key={`${item.data.id}-${column.field}-value`}
                      >
                        {valueRenderer(item.data, column)}
                      </dd>
                    </ItemField>
                  );
                })}
              </dl>
            )}
          </div>
        </div>
      </div>
    );
  }
}
