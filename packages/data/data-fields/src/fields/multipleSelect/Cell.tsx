import React from 'react';
// import { groupRenderer } from '../../groups';

export default (params) => {
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }

  const values = params.options.filter((option) =>
    (params.value || []).includes(option.id),
  );

  if (!values || values.length === 0) {
    return null;
  }

  return (
    <div tw="truncate -mb-1.5">
      {values.map((value) => (
        <span
          tw="rounded px-2 py-1 inline-flex text-sm mr-1.5 mb-1.5"
          style={{
            backgroundColor: value.color || '#f1f3f5',
            lineHeight: 'normal',
          }}
        >
          <div tw="truncate">{value.name}</div>
        </span>
      ))}
    </div>
  );
};
