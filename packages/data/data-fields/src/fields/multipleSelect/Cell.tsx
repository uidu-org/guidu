import { CellContext } from '@tanstack/react-table';
import React from 'react';
// import { groupRenderer } from '../../groups';

export default function Cell<T>(props: CellContext<T, string[]>) {
  const { getValue, column } = props;
  const value = getValue();
  // if (props.row.isGrouped) {
  //   return groupRenderer(props);
  // }

  const values = (column.columnDef.meta?.options || []).filter((option) =>
    (value || []).includes(option.id),
  );

  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div tw="truncate -mb-1.5">
      {values.map((v) => (
        <span
          key={v.id}
          tw="rounded px-2 py-1 inline-flex text-sm mr-1.5 mb-1.5"
          style={{
            backgroundColor: v.color || '#f1f3f5',
            lineHeight: 'normal',
          }}
        >
          <div tw="truncate">{v.name}</div>
        </span>
      ))}
    </div>
  );
}
