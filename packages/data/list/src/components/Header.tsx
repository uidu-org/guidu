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
          minWidth: '100%',
          paddingLeft: gutterSize + 1, // border,
          width: 'fit-content',
          height: style.height,
          borderBottom: '1px solid #f2f2f3',
          borderTop: '1px solid #f2f2f3',
          fontSize: '14px',
          fontWeight: 500,
        }}
        className="sticky-top d-flex align-items-center bg-white"
      >
        {cover && (
          <div
            className="text-truncate d-flex align-items-center data-list-cover-header px-3 px-xl-4"
            style={{
              width: cover.width || '138px',
              backgroundColor: 'transparent',
              height: '100%',
              flexShrink: 0,
            }}
          >
            <span className="mr-2" style={{ opacity: 0.4 }}>
              {cover.headerComponentParams.menuIcon}
            </span>
            Cover
          </div>
        )}
        <div className="d-flex flex-column">
          <div className="d-flex">
            {columnDefs
              .filter(
                (column) =>
                  column.type !== 'cover' && column.type !== 'primary',
              )
              .map(
                ({
                  id,
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
                      key={`${id}-label`}
                      className="text-truncate data-list-header px-3 px-xl-4"
                      style={{
                        width: width || '150px',
                        minWidth: minWidth || 'auto',
                        maxWidth: maxWidth || 'auto',
                      }}
                    >
                      {menuIcon && (
                        <span className="mr-2" style={{ opacity: 0.4 }}>
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
