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

export function ValueRenderer(params) {
  const value = params.options.filter(
    (option) => option.id === params.value,
  )[0];

  if (!value) {
    return null;
  }

  return <Option value={value} />;
}

export default (params) => {
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }
  if (params.column?.editable) {
    return <EditableCell {...params} />;
  }

  return <ValueRenderer {...params} />;
};
