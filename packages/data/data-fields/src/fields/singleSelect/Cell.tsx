import { CellContext } from '@tanstack/react-table';
import React, { memo } from 'react';
// import { groupRenderer } from '../../groups';
import EditableCell from './EditableCell';
import { ValueRenderer } from './utils';

function Cell(props: CellContext<any, string>) {
  const { column } = props;
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }
  if (column?.columnDef?.meta?.enableEditing) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <EditableCell {...props} />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ValueRenderer {...props} />;
}

export default memo(Cell);
