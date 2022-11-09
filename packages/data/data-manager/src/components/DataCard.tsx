import { flexRender } from '@tanstack/react-table';
import React from 'react';
import { useDataManagerContext } from './DataManagerContext';

export default function DataCard<T>({ item }: { item: T }) {
  const { tableInstance, onItemClick } = useDataManagerContext();
  if (!item) {
    return null;
  }

  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();

  const row = rows.find((r) => r.original.id === item.id);

  const visibleCells = row
    .getVisibleCells()
    .filter(
      (cell) =>
        cell.column.columnDef.meta?.kind !== 'uid' &&
        !cell.column.columnDef.meta?.isPrivate &&
        cell.column.columnDef.meta?.kind !== 'addField',
    );

  const primary = row
    .getVisibleCells()
    .find((cell) => cell.column.columnDef.meta?.isPrimary);

  return (
    <div key={item.id} tw="relative">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onItemClick(row.original);
        }}
        tw="absolute inset-0"
      />
      <div className="">
        {primary && (
          <div
            className="card-header text-truncate border-bottom-0"
            style={{ fontWeight: 500 }}
          >
            {/* {primary.render('Cell', { ...primary.cellProps })} */}
          </div>
        )}
        <div className={`${primary ? 'mt-n3' : ''} card-body pt-1`}>
          <dl>
            {visibleCells.map((cell) => (
              <div tw="[height:4.5rem]">
                <dt tw="text-sm [color:rgb(var(--body-secondary-color))] truncate mb-2">
                  <div tw="flex-grow truncate">
                    {cell.column.columnDef.meta?.icon && (
                      <span tw="mr-2 [color:rgb(var(--body-secondary-color))] opacity-40">
                        {cell.column.columnDef.meta?.icon}
                      </span>
                    )}
                    {cell.column.columnDef.meta?.name}
                  </div>
                </dt>
                <dd tw="flex" key={`${item.id}-${cell.column.id}-value`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
