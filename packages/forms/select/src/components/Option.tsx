import React from 'react';

const Option = ({ innerProps, data, getStyles, ...otherProps }) => {
  return (
    <div
      {...innerProps}
      className="d-flex align-items-center mr-auto"
      style={{
        ...getStyles('option', otherProps),
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
        <p className="mb-0">{data.name}</p>
        {/* {data.description && (
          <p className="text-muted text-truncate mb-0 small">
            {data.description}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default Option;
