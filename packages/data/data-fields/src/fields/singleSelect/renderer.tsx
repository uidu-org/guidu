import React from 'react';
// import { groupRenderer } from '../../groups';

export default (params) => {
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }

  const value = params.options.filter(
    (option) => option.id === params.value,
  )[0];

  if (!value) {
    return null;
  }

  return (
    <div className="text-truncate">
      <span
        tw="rounded px-2 py-1 inline-flex text-sm"
        style={{
          backgroundColor: value.color || '#f1f3f5',
          lineHeight: 'normal',
        }}
      >
        <div className="text-truncate">{value.name}</div>
      </span>
    </div>
  );
};
