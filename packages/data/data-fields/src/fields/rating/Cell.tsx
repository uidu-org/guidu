import { CellContext } from '@tanstack/react-table';
import React from 'react';
import EditableCell from './EditableCell';
import { StyledRating } from './utils';

export default function Cell(props: CellContext<any, number>) {
  const { getValue, column } = props;
  const value = getValue() || 0;

  const max = column.columnDef?.meta?.max || 5;

  if (column?.columnDef.meta.enableEditing) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <EditableCell {...props} />;
  }

  return (
    <div tw="flex items-center">
      <StyledRating value={value} readOnly items={max} />
    </div>
  );
}
