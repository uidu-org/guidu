import { CellContext } from '@tanstack/react-table';
import React from 'react';

export default function Cell<T>(props: CellContext<T, number>) {
  // if (props.row.isGrouped) {
  //   return groupRenderer(props);
  // }
  const { getValue, column } = props;

  return (
    <div tw="flex flex-grow justify-end">
      {column.columnDef.meta?.valueFormatter
        ? column.columnDef.meta?.valueFormatter(getValue())
        : getValue()}
    </div>
  );
}
