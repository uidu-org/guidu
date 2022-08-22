import React from 'react';
import { Check } from 'react-feather';
import tw from 'twin.macro';
import { FieldDownshiftOptionProps } from '../../types';

export default function HorizontalCard({
  item,
  index,
  isSelected,
  getItemProps,
}: FieldDownshiftOptionProps<unknown>) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <a
      key={index}
      href="#"
      css={[isSelected && tw`border-primary`, tw`relative p-2 border rounded`]}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <div tw="absolute w-full bg-transparent border-0 text-right p-2 inset-0 right-full">
        <span
          css={[
            isSelected
              ? tw`text-opacity-100 bg-opacity-100 bg-primary text-on-primary`
              : tw`border`,
            tw`flex items-center justify-center w-6 h-6 ml-auto rounded-full`,
          ]}
        >
          {isSelected && <Check size={16} />}
        </span>
      </div>
      <div tw="p-2 md:p-3">
        <div tw="flex items-center">
          {item.before && <div tw="mr-3 flex">{item.before}</div>}
          <div>
            <div tw="text-lg">{item.name}</div>
            {item.description && (
              <div tw="mb-0 mt-1 text-gray-500">{item.description}</div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
