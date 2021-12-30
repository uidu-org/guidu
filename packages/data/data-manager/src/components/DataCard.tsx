import React from 'react';
import { useDataManagerContext } from '..';

export default function DataCard({ item }) {
  const { tableInstance } = useDataManagerContext();
  if (!item) {
    return null;
  }

  const { prepareRow, rows } = tableInstance;
  const row = rows.find((r) => r.original.id === item.id);
  prepareRow(row);

  // const visibleCells = row.cells.filter(
  //   (cell) =>
  //     cell.column.kind !== 'uid' &&
  //     cell.column.kind !== 'selection' &&
  //     cell.column.kind !== 'primary' &&
  //     !cell.column.isPrivate &&
  //     cell.column.kind !== 'addField',
  // );

  const primary = row.cells.find((cell) => {
    return cell.column.isPrimary;
  });
  const visibleCells = [];

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        // onItemClick({ data: item.data});
      }}
      key={item.id}
    >
      <div className="">
        {primary && (
          <div
            className="card-header text-truncate border-bottom-0"
            style={{ fontWeight: 500 }}
          >
            {primary.render('Cell', { ...primary.cellProps })}
          </div>
        )}
        <div className={`${primary ? 'mt-n3' : ''} card-body pt-1`}>
          <dl>
            {visibleCells.map((cell) => {
              return (
                <>
                  <dt
                    tw="text-sm color[rgb(var(--body-secondary-color))] truncate mt-3"
                    key={`${item.id}-${cell.column.id}-name`}
                  >
                    {cell.render('Header')}
                  </dt>
                  <dd tw="truncate" key={`${item.id}-${cell.column.id}-value`}>
                    {cell.render('Cell', { ...cell.column.cellProps })}
                  </dd>
                </>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
