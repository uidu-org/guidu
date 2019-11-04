import React from 'react';

const MultiValueLabel = ({ innerProps, data }) => {
  return (
    <div
      {...innerProps}
      className="d-flex align-items-center"
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
        <div className="mr-2 flex-shrink-0 d-flex" style={{ width: 16 }}>
          {data.before}
        </div>
      )}
      <div style={{ minWidth: 0 }}>
        <p className="mb-0">{data.name}</p>
      </div>
    </div>
  );
};

export default MultiValueLabel;
