import { getCover, getPrimary, valueRenderer } from '@uidu/table';
import React, { PureComponent } from 'react';

export default class Item extends PureComponent<any> {
  render() {
    const { columnIndex, rowIndex, style, data } = this.props;
    const { items, columnDefs, gutterSize } = data;
    const item = items[rowIndex] && items[rowIndex][columnIndex];
    if (!item) {
      return null;
    }

    const primary = getPrimary(columnDefs);
    const cover = getCover(columnDefs);

    return (
      <div
        style={{
          ...style,
          left: style.left + gutterSize,
          top: style.top + gutterSize,
          width: style.width - gutterSize,
          height: style.height - gutterSize,
        }}
        key={item.id}
      >
        <div className="card">
          {cover && (
            <div
              style={{
                height: cover.width ? (cover.width * 3) / 2 : '207px',
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                backgroundImage: `url(${valueRenderer(
                  item.data[cover.field],
                  cover,
                )})`,
              }}
            />
          )}
          <div className="card-body">
            {primary && (
              <div className="card-title">
                {valueRenderer(item.data[primary.field], primary)}
              </div>
            )}
            <dl className="mb-0">
              {columnDefs.map(column => [
                <dt
                  className="small text-muted mt-3 text-truncate"
                  key={`${item.id}-${column.field}-name`}
                >
                  {column.headerComponentParams &&
                  column.headerComponentParams.menuIcon ? (
                    <span className="mr-2">
                      {column.headerComponentParams.menuIcon}
                    </span>
                  ) : null}
                  {column.headerName}
                </dt>,
                <dd
                  className="mb-0 text-truncate"
                  key={`${item.id}-${column.field}-value`}
                >
                  {valueRenderer(item.data[column.field], column)}
                </dd>,
              ])}
            </dl>
          </div>
        </div>
      </div>
    );
  }
}
