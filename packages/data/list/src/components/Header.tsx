import React from 'react';

export default function Header({
  headerGroups,
  headerIcons,
  gutterSize = 16,
  style = {},
}) {
  const cover = null;
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <div
          {...headerGroup.getHeaderGroupProps()}
          style={{
            ...style,
            minWidth: '100%',
            width: 'fit-content',
            height: style.height,
            borderBottom: '1px solid #f2f2f3',
            fontSize: '14px',
            fontWeight: 500,
            padding: '1rem 0',
          }}
          className="sticky-top d-flex align-items-center bg-white mx-n3 mx-xl-n4"
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
                {cover.icon}
              </span>
              Cover
            </div>
          )}
          <div className="d-flex flex-column">
            <div className="d-flex">
              {headerGroup.headers
                .filter((column) => !column.isPrivate && !column.isPrimary)
                .map((column) => {
                  const { id, width, minWidth, maxWidth, name, icon } = column;
                  return (
                    <div
                      key={`${id}-label`}
                      className="text-truncate d-flex align-items-center px-3 px-xl-4"
                      style={{
                        width: width || '150px',
                        minWidth: minWidth || 'auto',
                        maxWidth: maxWidth || 'auto',
                      }}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...column.getHeaderProps([
                        {
                          style: {
                            ...column.style,
                            // width: column.width,
                            // maxWidth: column.maxWidth,
                            // minWidth: column.minWidth,
                            ...(column.isSorted
                              ? { backgroundColor: 'rgb(254, 248, 244)' }
                              : {}),
                            ...column.headerStyle,
                          },
                        },
                      ])}
                    >
                      {column.render('Header', {
                        headerIcons,
                        autosizeAllColumns: () => {
                          // columns.map((column) => {
                          //   return setColumnWidth(column, getColumnWidth(column));
                          // });
                        },
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
