import { CellContext } from '@tanstack/react-table';
import React from 'react';

export default function Cell<T>(props: CellContext<T, string>) {
  // if (props.row.isGrouped) {
  //   return groupRenderer(props);
  // }
  const { getValue } = props;

  return <div tw="truncate">{getValue()}</div>;
}
