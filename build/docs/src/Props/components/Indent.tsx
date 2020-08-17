import React, { ReactNode } from 'react';

export default function Indent(props: { children: ReactNode }) {
  return <div style={{ paddingLeft: '1.3em' }}>{props.children}</div>;
}
