import React from 'react';

export default function LayoutSection(props: { width?: number; children }) {
  return (
    <div
      data-layout-column
      data-column-width={props.width}
      style={{ flexBasis: `${props.width}%` }}
    >
      {props.children}
    </div>
  );
}
