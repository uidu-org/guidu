import { CellContext } from '@tanstack/react-table';
import React, { memo } from 'react';

function Cell<T>(props: CellContext<T, string>) {
  // if (props.row.isGrouped) {
  //   return groupRenderer(props);
  // }
  const { getValue } = props;

  return <div tw="truncate">{getValue()}</div>;
}

export default memo(Cell);
