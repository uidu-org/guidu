import { StarIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import tw from 'twin.macro';

export default function EditableCell(params) {
  const max = params.cellProps?.max || 5;
  const { value: initialValue } = params;

  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    e.preventDefault();
    // setValue(i + 1);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div tw="flex items-center">
      {Array.from(Array(max).keys()).map((i) => {
        return (
          <button
            type="button"
            css={[
              value >= i + 1
                ? tw`text-yellow-300`
                : tw`text-gray-200 cursor-pointer hover:text-yellow-300`,
            ]}
            onClick={onChange}
          >
            <StarIcon tw="fill-current h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}
