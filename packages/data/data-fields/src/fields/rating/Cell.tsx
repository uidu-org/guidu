import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import tw from 'twin.macro';
import EditableCell from './EditableCell';

export default function Cell(params) {
  const max = params.cellProps?.max || 5;
  const { value } = params;

  if (params.column?.editable) {
    return <EditableCell {...params} />;
  }

  return (
    <div tw="flex items-center">
      {Array.from(Array(max).keys()).map((i) => {
        return (
          <div css={[value >= i + 1 ? tw`text-yellow-300` : tw`text-gray-200`]}>
            <StarIcon tw="fill-current h-5 w-5" />
          </div>
        );
      })}
    </div>
  );
}
