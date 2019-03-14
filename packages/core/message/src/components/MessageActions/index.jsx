import React from 'react';

export default function MessageActions({ children }) {
  return (
    <div
      className="btn-group btn-group-sm rounded d-hover position-absolute"
      role="group"
      aria-label="Button group with nested dropdown"
      style={{ right: 0, top: -12 }}
    >
      {children}
    </div>
  );
}
