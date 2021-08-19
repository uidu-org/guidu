import React from 'react';

const MultiValueLabel = ({ innerProps, data }) => {
  return (
    <div
      {...innerProps}
      tw="flex items-center"
      style={{
        // padding: '1rem',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 1,
        marginBottom: 1,
        minWidth: 0,
        width: 'auto',
      }}
    >
      {data.before && (
        <div tw="mr-2 flex-shrink-0 flex" style={{ width: 16 }}>
          {data.before}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <div>{data.name}</div>
      </div>
    </div>
  );
};

export default MultiValueLabel;
