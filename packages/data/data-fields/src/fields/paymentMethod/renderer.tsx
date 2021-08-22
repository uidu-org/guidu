import React from 'react';
// import { groupRenderer } from '../../groups';

export default (params) => {
  // create the cell
  // if (params.row.isGrouped) {
  //   return groupRenderer(params);
  // }

  if (params.value) {
    // show option cell
    return (
      <span
        style={{
          minWidth: '18px',
          fontSize: '.9rem',
          fontWeight: 500,
          borderRadius: '9999px',
          paddingLeft: '.5rem',
          paddingRight: '.5rem',
          paddingTop: '.15rem',
          paddingBottom: '.15rem',
          backgroundColor: params.value?.color || '#f1f3f5',
          display: 'inline-flex',
          lineHeight: 'normal',
        }}
      >
        <div tw="truncate">{params.value?.name}</div>
      </span>
    );
  }

  return (
    <>
      <span tw="mr-3">**** 5518</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-credit-card"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
      </svg>
    </>
  );
};
