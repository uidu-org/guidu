import { getCover, getPrimary, valueRenderer } from '@uidu/table';
import React, { PureComponent } from 'react';

export default class Item extends PureComponent<any> {
  render() {
    const { columnIndex, rowIndex, style, data } = this.props;
    const { items, columnDefs, gutterSize, onItemClick } = data;
    const item = items[rowIndex] && items[rowIndex][columnIndex];
    if (!item) {
      return null;
    }

    console.log(item);

    const primary = getPrimary(columnDefs);
    const cover = getCover(columnDefs);

    return (
      <div
        onClick={e => {
          e.preventDefault();
          onItemClick(item.data);
        }}
        style={{
          ...style,
          cursor: 'pointer',
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
          {primary && (
            <div className="card-header text-truncate font-weight-bold">
              {valueRenderer(item.data[primary.field], primary)}
            </div>
          )}
          <div className={primary ? 'card-body pt-1' : 'card-body'}>
            <dl className="mb-0">
              {columnDefs
                .filter(
                  column =>
                    column.type !== 'cover' && column.type !== 'primary',
                )
                .map(column => [
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
