import React, { PureComponent } from 'react';

const GUTTER_SIZE = 8;

export default class Header extends PureComponent<any> {
  render() {
    const { style, data } = this.props;
    const { columnDefs, gutterSize } = data;
    return (
      <div
        style={{
          ...style,
          minWidth: `calc(100% - ${gutterSize * 2}px)`,
          paddingLeft: gutterSize + 1, // border,
          width: 'fit-content',
          height: style.height,
        }}
        className="sticky-top d-flex align-items-center bg-white border-bottom"
      >
        <div
          style={{
            width: '138px',
            backgroundColor: 'transparent',
            marginRight: '1rem',
            height: '100%',
            flexShrink: 0,
          }}
        />
        <div className="d-flex flex-column">
          <div className="d-flex">
            {columnDefs.map(column => (
              <div
                key={`${column.colId}-label`}
                className="text-truncate"
                style={{ width: '150px' }}
              >
                {column.headerName}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
