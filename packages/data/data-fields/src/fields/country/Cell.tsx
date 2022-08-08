import { CellContext } from '@tanstack/react-table';
import React from 'react';

export default function Cell<T>({ getValue, column }: CellContext<T, unknown>) {
  // if (props.node && props.node.group) {
  //   return null;
  // }

  const value = getValue();

  if (!value) {
    return null;
  }

  const option = (column.columnDef?.meta?.options || []).find(
    (o) => o.id === value,
  );

  if (!option) {
    return value;
  }

  return (
    <>
      <span tw="mr-2.5 flex-shrink-0">{option.before}</span>
      <div tw="truncate">{option.name}</div>
    </>
  );
}
