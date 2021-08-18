import React from 'react';
import { CheckSquare, Square } from 'react-feather';
import tw from 'twin.macro';

export default function Checkbox({ item, index, isSelected, getItemProps }) {
  return (
    <button
      type="button"
      key={item.id}
      css={[
        tw`flex border px-4 py-3 mb-2 items-center justify-start text-left flex-row w-full`,
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
