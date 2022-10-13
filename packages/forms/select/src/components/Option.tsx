import React from 'react';
import { OptionProps } from 'react-select';

function Option<T>({
  innerProps,
  data,
  getStyles,
  innerRef,
  ...otherProps
}: OptionProps<T>) {
  return (
    <div
      {...innerProps}
      ref={innerRef}
      style={{
        ...getStyles('option', otherProps),
        // padding: '1rem',
      }}
    >
      <div tw="flex items-center mr-auto min-w-0 w-auto">
        {data.before && (
          <div tw="mr-3 flex-shrink-0 flex w-6 h-6">{data.before}</div>
        )}
        <div tw="min-w-0 flex-1">
          <div tw="mb-0 truncate">{data.name}</div>
        </div>
      </div>
    </div>
  );
}

export default Option;
