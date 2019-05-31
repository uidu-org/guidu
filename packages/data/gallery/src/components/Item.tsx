import React, { PureComponent } from 'react';

export default class Item extends PureComponent<any> {
  valueRenderer = (
    value,
    { cellRendererFramework: Renderer, valueFormatter },
  ) => {
    if (!value) {
      return '-';
    }

    if (Renderer) {
      return (
        <Renderer value={valueFormatter ? valueFormatter(value) : value} />
      );
    }
    return valueFormatter ? valueFormatter(value) : value;
  };

  render() {
    const { columnIndex, rowIndex, style, isScrolling, data } = this.props;
    const { items, columnDefs, gutterSize, columnCount } = data;
    const item = items[rowIndex] && items[rowIndex][columnIndex];
    if (!item) {
      return null;
    }

    console.log(style);

    return (
      <div
        style={{
          ...style,
          left: style.left + gutterSize,
          top: style.top + gutterSize,
          width: style.width - gutterSize,
          height: style.height - gutterSize,
        }}
        className="card"
        key={item.id}
      >
        <div className="card-body">
          <div className="card-title">Test</div>
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
                {this.valueRenderer(item.data[column.field], column)}
              </dd>,
            ])}
          </dl>
        </div>
      </div>
    );
  }
}
