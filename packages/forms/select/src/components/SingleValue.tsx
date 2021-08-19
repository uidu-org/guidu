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
        <div tw="mr-2 flex-shrink-0 flex" style={{ width: 22 }}>
          {data.before}
        </div>
      )}
      <div tw="min-w-0">
        <div tw="truncate">{data.name}</div>
      </div>
    </div>
  );
};

export default SingleValue;
