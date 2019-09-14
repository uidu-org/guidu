import { getCover, getPrimary, valueRenderer } from '@uidu/table';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  transition: all 500ms ease-in-out;
  cursor: pointer;
`;

export default class Item extends PureComponent<any> {
  render() {
    const { index, style, data } = this.props;
    const { items, columnDefs, gutterSize, onItemClick } = data;
    const item = items[index];

    if (!item) {
      return null;
    }

    const primary = getPrimary(columnDefs);
    const cover = getCover(columnDefs);

    return (
      <StyledItem
        key={item.id}
        onClick={e => {
          e.preventDefault();
          onItemClick(item);
        }}
        style={{
          ...style,
          minWidth: `calc(100% - ${gutterSize * 2}px)`,
          left: style.left + gutterSize,
          // top: style.top + gutterSize,
          top: 0,
          transform: `translate3d(0px,${style.top}px, 0px)`,
          willChange: 'transform',
          transition: '300ms transform',
          height: style.height,
        }}
        className="d-flex border-bottom flex-row align-items-center w-auto"
      >
        {cover && (
          <div
            style={{
              width: cover.width || '138px',
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
              backgroundImage: `url(${valueRenderer(
                item[cover.field],
                cover,
              )})`,
              height: '100%',
              flexShrink: 0,
            }}
          />
        )}
        <div className="d-flex flex-column">
          {primary && (
            <div
              className="mb-2 data-list-primary-cell px-3 px-xl-4"
              style={{
                position: 'sticky',
                left: '1rem',
                width: 'fit-content',
              }}
            >
              {valueRenderer(item.data[primary.field], primary)}
            </div>
          )}
          <div className="d-flex">
            {columnDefs
              .filter(
                column => column.type !== 'cover' && column.type !== 'primary',
              )
              .map(column => (
                <div
                  key={`${item.id}-${column.colId}-value`}
                  className="text-truncate data-list-cell px-3 px-xl-4"
                  style={{
                    width: column.width || '150px',
                    minWidth: column.minWidth || 'auto',
                    maxWidth: column.maxWidth || 'auto',
                  }}
                >
                  {valueRenderer(item.data[column.field], column)}
                </div>
              ))}
          </div>
        </div>
      </StyledItem>
    );
  }
}
