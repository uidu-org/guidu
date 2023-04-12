import { CellContext } from '@tanstack/react-table';
import React, { memo } from 'react';
// import { groupRenderer } from '../../groups';
import EditableCell from './EditableCell';
import { ValueRenderer } from './utils';

function Cell(props: CellContext<any, string>) {
  const { column, cell } = props;
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }
  if (column?.columnDef?.meta?.enableEditing) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <EditableCell key={cell.id} {...props} />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ValueRenderer key={cell.id} {...props} />;
}

export default memo(Cell);
