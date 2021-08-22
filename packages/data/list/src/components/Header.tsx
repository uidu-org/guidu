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
            height: style.height,
            fontSize: '14px',
            fontWeight: 500,
          }}
          tw="sticky top-0 flex items-center background[rgb(var(--body-on-primary-bg))] min-w-full width[fit-content] border-b px-4"
          className="mx-n3 mx-xl-n4"
        >
          {cover && (
            <div
              tw="truncate flex items-center px-3 xl:px-4 h-full bg-transparent flex-shrink-0"
              style={{
                width: cover.width || '138px',
              }}
            >
              <span tw="mr-2.5 opacity-40">{cover.icon}</span>
              Cover
            </div>
          )}
          <div tw="flex flex-col">
            <div tw="flex">
              {headerGroup.headers
                .filter((column) => !column.isPrivate && !column.isPrimary)
                .map((column) => {
                  const { id, width, minWidth, maxWidth, name, icon } = column;
                  return (
                    <div
                      key={`${id}-label`}
                      tw="truncate flex items-center px-3 xl:px-4"
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
