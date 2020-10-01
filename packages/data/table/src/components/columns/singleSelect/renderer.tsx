import React from 'react';
import { groupRenderer } from '../../groups';

export default (params) => {
  if (params.row.isGrouped) {
    return groupRenderer(params);
  }

  const value = params.column.cellRendererParams.options.filter(
    (option) => option.id === params.value,
  )[0];

  if (!value) {
    return null;
  }

  return (
    <span
      style={{
        borderRadius: '9999px',
        paddingLeft: '.5rem',
        paddingRight: '.5rem',
        paddingTop: '.15rem',
        paddingBottom: '.15rem',
        backgroundColor: value.color || '#f1f3f5',
        display: 'inline-flex',
        lineHeight: 'normal',
      }}
    >
      <div className="text-truncate">{value.name}</div>
    </span>
  );
};
