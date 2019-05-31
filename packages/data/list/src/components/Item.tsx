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
    const { index, style, data } = this.props;
    const { items, columnDefs, gutterSize } = data;
    const item = items[index];

    if (!item) {
      return null;
    }

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
        <div
          style={{
            width: '138px',
            backgroundColor: 'red',
            marginRight: '1rem',
            height: '100%',
            flexShrink: 0,
          }}
        />
        <div className="d-flex flex-column">
          <div
            className="mb-2"
            style={{
              position: 'sticky',
              left: '1rem',
              width: 'fit-content',
            }}
          >
            <p className="font-weight-bold mb-0">Test</p>
          </div>
          <div className="d-flex">
            {columnDefs.map(column => (
              <div
                key={`${item.id}-${column.colId}-value`}
                className="text-truncate"
                style={{ width: '150px' }}
              >
                {this.valueRenderer(item[column.field], column)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
