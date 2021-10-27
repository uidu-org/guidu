import React from 'react';

export default (params) => {
  return (
    <div style={{ minWidth: 0 }}>
      <div className="progress" style={{ height: '5px' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${params.value * 100}%` }}
          aria-valuenow={params.value * 100}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};
