import { getCover, getPrimary, valueRenderer } from '@uidu/table';
import React, { PureComponent } from 'react';

export default class Item extends PureComponent<any> {
  render() {
    const { index, style, data } = this.props;
    const { items, columnDefs, gutterSize } = data;
    const item = items[index];

    if (!item) {
      return null;
    }

    const primary = getPrimary(columnDefs);
    const cover = getCover(columnDefs);

    return (
      <div
        style={{
          ...style,
          minWidth: `calc(100% - ${gutterSize * 2}px)`,
          left: style.left + gutterSize,
          top: style.top + gutterSize,
          // width: style.width - GUTTER_SIZE,
          height: style.height - gutterSize,
          transition: 'all 500ms ease-in-out',
        }}
        className="card flex-row align-items-center w-auto"
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
        <div className="d-flex flex-column ml-3">
          {primary && (
            <div
              className="mb-2"
              style={{
                position: 'sticky',
                left: '1rem',
                width: 'fit-content',
              }}
            >
              <p className="font-weight-bold mb-0">
                {valueRenderer(item[primary.field], primary)}
              </p>
            </div>
          )}
          <div className="d-flex">
            {columnDefs.map(column => (
              <div
                key={`${item.id}-${column.colId}-value`}
                className="text-truncate"
                style={{
                  width: column.width || '150px',
                  minWidth: column.minWidth || 'auto',
                  maxWidth: column.maxWidth || 'auto',
                }}
              >
                {valueRenderer(item[column.field], column)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
