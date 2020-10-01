import React from 'react';
import { groupRenderer } from '../../groups';

export default (params) => {
  if (params.node && params.node.group) {
    return groupRenderer(params);
  }

  const { value, row } = params;
  // create the cell
  return (
    <div style={{ minWidth: 0 }}>
      <span className="d-flex align-items-center">
        <img
          className="rounded-circle mr-2"
          style={{ width: 24 }}
          src={row.original.avatar}
        />
        <span className="text-truncate">{value}</span>
      </span>
    </div>
  );
};
