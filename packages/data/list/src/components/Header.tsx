import { getCover } from '@uidu/table';
import React, { PureComponent } from 'react';

export default class Header extends PureComponent<any> {
  render() {
    const { style, data } = this.props;
    const { columnDefs, gutterSize } = data;
    const cover = getCover(columnDefs);

    return (
      <div
        style={{
          ...style,
          minWidth: `calc(100% - ${gutterSize * 2}px)`,
          paddingLeft: gutterSize + 1, // border,
          width: 'fit-content',
          height: style.height,
        }}
        className="sticky-top d-flex align-items-center bg-light border-bottom"
      >
        {cover && (
          <div
            style={{
              width: cover.width || '138px',
              backgroundColor: 'transparent',
              height: '100%',
              flexShrink: 0,
            }}
          />
        )}
        <div className="d-flex flex-column ml-3">
          <div className="d-flex">
            {columnDefs.map(
              ({
                colId,
                width,
                minWidth,
                maxWidth,
                headerName,
                headerComponentParams,
              }) => {
                let menuIcon;
                if (headerComponentParams) {
                  menuIcon = headerComponentParams.menuIcon;
                }
                return (
                  <div
                    key={`${colId}-label`}
                    className="text-truncate"
                    style={{
                      width: width || '150px',
                      minWidth: minWidth || 'auto',
                      maxWidth: maxWidth || 'auto',
                    }}
                  >
                    {menuIcon && (
                      <span className="mr-2" style={{ opacity: 0.5 }}>
                        {menuIcon}
                      </span>
                    )}
                    {headerName}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    );
  }
}
