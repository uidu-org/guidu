import { CellContext } from '@tanstack/react-table';
import React from 'react';

export default function Cell<T>(props: CellContext<T, number>) {
  // if (props.row.isGrouped) {
  //   return groupRenderer(props);
  // }
  const { getValue } = props;

  return <div tw="flex justify-end flex-grow">{getValue()}</div>;
}
