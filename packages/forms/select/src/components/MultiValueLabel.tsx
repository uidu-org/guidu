import React from 'react';

function MultiValueLabel({ innerProps, data }) {
  return (
    <div
      {...innerProps}
      tw="flex items-center ml-2 mr-2 mt-px mb-px min-w-0 w-auto"
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
}

export default MultiValueLabel;
