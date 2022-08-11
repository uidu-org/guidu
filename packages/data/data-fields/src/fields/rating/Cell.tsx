import { StarIcon } from '@heroicons/react/solid';
import { CellContext } from '@tanstack/react-table';
import React from 'react';
import tw from 'twin.macro';
import EditableCell from './EditableCell';

export default function Cell(props: CellContext<any, number>) {
  const { getValue, column, row } = props;
  const value = getValue();

  const max = column.columnDef?.meta?.max || 5;

  if (column?.editable) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <EditableCell {...props} />;
  }

  return (
    <div tw="flex items-center">
      {Array.from(Array(max).keys()).map((i) => (
        <div
          key={`${row.id}-${column.id}-rating-${i}`}
          css={[value >= i + 1 ? tw`text-yellow-300` : tw`text-gray-200`]}
        >
          <StarIcon tw="fill-current h-5 w-5" />
        </div>
      ))}
    </div>
  );
}
