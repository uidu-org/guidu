import React from 'react';
import { PhoneCall } from 'react-feather';

export default (params) => {
  // create the cell
  return (
    <span tw="flex items-center content-between">
      <span tw="flex-grow truncate">{params.value || '-'}</span>$
      {params.value ? (
        <a
          href={`tel:${params.value}`}
          target="_blank"
          tw="p-1 ml-3 flex"
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
