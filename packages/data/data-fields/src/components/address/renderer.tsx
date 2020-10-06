import React from 'react';
import { PhoneCall } from 'react-feather';

export default (params) => {
  // create the cell
  return (
    <span className="d-flex align-items-center justify-content-between">
      <span className="flex-grow-1 text-truncate">{params.value || '-'}</span>$
      {params.value ? (
        <a
          href={`tel:${params.value}`}
          target="_blank"
          className="btn p-1 ml-3 d-flex"
          type="button"
        >
          <PhoneCall size={14} />
        </a>
      ) : (
        ''
      )}
    </span>
  );
};
