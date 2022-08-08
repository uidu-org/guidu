import { CellContext } from '@tanstack/react-table';
import React from 'react';
// import { groupRenderer } from '../../groups';
import EditableCell from './EditableCell';

export function Option({ value }) {
  return (
    <div tw="truncate">
      <span
        tw="rounded px-2 py-1 inline-flex text-sm"
        style={{
          backgroundColor: value.color || '#f1f3f5',
          lineHeight: 'normal',
        }}
      >
        <div tw="truncate">{value.name}</div>
      </span>
    </div>
  );
}

export function ValueRenderer(props: CellContext<any, string>) {
  const { getValue, column } = props;
  const value = (column.columnDef.meta?.options || []).find(
    (option) => option.id === getValue(),
  );

  if (!value) {
    return null;
  }

  return <Option value={value} />;
}

export default function Cell(props: CellContext<any, string>) {
  const { column } = props;
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }
  if (column?.columnDef?.meta?.editable) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <EditableCell {...props} />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ValueRenderer {...props} />;
}
