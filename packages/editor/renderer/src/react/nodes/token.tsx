import React from 'react';

export interface Props {
  id: string;
  name: string;
}

export default function Token(props: Props) {
  const { id, name } = props;

  return <span tw="mx-0.5 rounded p-0.5 py-1 bg-gray-100">{`{${name}}`}</span>;
}
