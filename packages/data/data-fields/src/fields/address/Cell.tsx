import { LocationMarkerIcon } from '@heroicons/react/outline';
import { CellContext } from '@tanstack/react-table';
import React from 'react';

export default function Cell<T>(props: CellContext<T, string>) {
  const { getValue } = props;
  const value = getValue();
  // if (props.row.isGrouped) {
  //   return groupRenderer(props);
  // }

  if (!value) {
    return null;
  }

  return (
    <div tw="flex items-center justify-between w-full min-w-0 min-h-0">
      <div tw="truncate">{value}</div>
      <div>
        <LocationMarkerIcon tw="h-4 w-4" />
      </div>
    </div>
  );
}
