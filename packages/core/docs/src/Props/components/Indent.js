import React, { type Node } from 'react';

export default function Indent(props: { children: Node }) {
  return <div style={{ paddingLeft: '1.3em' }}>{props.children}</div>;
}
