import { LocationMarkerIcon } from '@heroicons/react/outline';
import React from 'react';

export default (params) => {
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }

  if (!params.value) {
    return null;
  }

  return (
    <div tw="flex items-center justify-between w-full min-w-0 min-h-0">
      <div tw="truncate">{params.value.address}</div>
      <div>
        <LocationMarkerIcon tw="h-4 w-4" />
      </div>
    </div>
  );
};
