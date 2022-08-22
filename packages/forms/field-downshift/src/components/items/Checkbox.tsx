import React from 'react';
import { CheckSquare, Square } from 'react-feather';
import tw from 'twin.macro';
import { FieldDownshiftOptionProps } from '../../types';

export default function Checkbox({
  item,
  index,
  isSelected,
  getItemProps,
}: FieldDownshiftOptionProps<unknown>) {
  return (
    <button
      type="button"
      key={item.id}
      css={[
        tw`flex flex-row items-center justify-start w-full px-4 py-3 mb-2 text-left border rounded`,
        !!isSelected && tw`text-white background[rgb(var(--brand-primary))]`,
      ]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getItemProps({ item, index })}
    >
      {isSelected ? (
        <div tw="text-white mr-3 flex items-center">
          <CheckSquare size={16} />
        </div>
      ) : (
        <div tw="mr-3 flex items-center">
          <Square size={16} />
        </div>
      )}
      <div>
        <p>{item.name}</p>
        {item.description && <p tw="text-gray-500">{item.description}</p>}
      </div>
    </button>
  );
}
