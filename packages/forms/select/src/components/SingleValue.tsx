import React from 'react';

const SingleValue = ({ innerProps, data, getStyles, ...otherProps }) => {
  return (
    <div
      {...innerProps}
      tw="flex items-center mr-auto min-w-0 w-auto"
      style={{
        ...getStyles('singleValue', otherProps),
        // padding: '1rem',
      }}
    >
      {data.before && (
        <div tw="mr-3 flex-shrink-0 flex w-6 h-6">{data.before}</div>
      )}
      <div tw="min-w-0 flex-grow">
        <div tw="truncate">{data.name}</div>
      </div>
    </div>
  );
};

export default SingleValue;
