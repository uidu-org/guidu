import * as React from 'react';

export default function LayoutSection(
  props: { width?: number } & React.Props<any>,
) {
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
