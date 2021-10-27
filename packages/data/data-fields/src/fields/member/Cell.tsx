import React from 'react';
// import { groupRenderer } from '../../groups';

export default (params) => {
  // if (params.node && params.node.group) {
  //   return groupRenderer(params);
  // }

  const { value, row } = params;

  // create the cell
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
};
