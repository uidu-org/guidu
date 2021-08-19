import React from 'react';
import { Check } from 'react-feather';
import tw from 'twin.macro';

export default function HorizontalCard({
  item,
  index,
  scope,
  isSelected,
  getItemProps,
}) {
  const { onClick, ...rest } = getItemProps({ item, index });
  return (
    <a
      key={index}
      href="#"
      css={[isSelected && tw`border-primary`, tw`border p-4 rounded relative`]}
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
              ? tw`bg-primary bg-opacity-100 text-on-primary text-opacity-100`
              : tw`border`,
            tw`h-6 w-6 rounded-full flex items-center justify-center ml-auto`,
          ]}
        >
          {isSelected && <Check size={16} />}
        </span>
      </div>
      <div tw="p-3 md:p-4 flex items-center">
        <div tw="flex items-center md:text-center md:flex-col flex-grow">
          {item.before && (
            <div tw="mr-4 mb-0 md:mb-4 md:mr-0">{item.before}</div>
          )}
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
