import React, { memo } from 'react';

function Cell(params) {
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }
  const { value, row } = params;

  return (
    <div tw="min-w-0">
      <span tw="flex items-center">
        {params.avatar && (
          <img
            tw="rounded-full mr-2.5 border w-6"
            src={params.avatar(params)}
          />
        )}
        <span tw="truncate">{value}</span>
      </span>
    </div>
  );
}

export default memo(Cell);
