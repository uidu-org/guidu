import { CellContext } from '@tanstack/react-table';
import React, { memo } from 'react';

function Cell<T>(props: CellContext<T, string>) {
  // if (props.row.isGrouped) {
  //   return groupRenderer(props);
  // }
  const { getValue, row, column } = props;
  const value = getValue();

  return (
    <div tw="min-w-0">
      <span tw="flex items-center">
        {column.columnDef.meta?.avatar && (
          <img
            tw="rounded-full mr-2.5 border w-6"
            src={column.columnDef.meta.avatar({ row })}
            alt={value}
          />
        )}
        <span tw="truncate">{value}</span>
      </span>
    </div>
  );
}

export default memo(Cell);
