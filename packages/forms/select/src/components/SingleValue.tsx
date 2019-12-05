import React from 'react';

const SingleValue = ({ innerProps, data, getStyles, ...otherProps }) => {
  return (
    <div
      {...innerProps}
      className="d-flex align-items-center mr-auto"
      style={{
        ...getStyles('singleValue', otherProps),
        // padding: '1rem',
        minWidth: 0,
        width: 'auto',
      }}
    >
      {data.before && (
        <div className="mr-2 flex-shrink-0 d-flex" style={{ width: 22 }}>
          {data.before}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <p className="mb-0 text-truncate">{data.name}</p>
      </div>
    </div>
  );
};

export default SingleValue;
