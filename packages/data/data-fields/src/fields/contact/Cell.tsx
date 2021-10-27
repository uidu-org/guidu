import React from 'react';

export default (params) => {
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }
  const { value, row } = params;

  return (
    <div tw="min-w-0">
      <span tw="flex items-center">
        <img tw="rounded-full mr-2.5 w-6" src={row.original.avatar} />
        <span tw="truncate">{value}</span>
      </span>
    </div>
  );
};
