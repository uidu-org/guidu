import React from 'react';

export default function FormFooter({ ...otherProps }) {
  return (
    <div
      {...otherProps}
      className="d-flex align-items-center justify-content-between"
    />
  );
}
