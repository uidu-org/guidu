import React from 'react';

export default function TokenNodeView(props) {
  const {
    node: {
      attrs: { id, name },
    },
    view,
    view: {
      state: { schema, selection },
    },
    getPos,
  } = props;

  return (
    <span tw="bg-gray-100 py-0.5 px-1 rounded mx-0.5">{`{{${name}}}`}</span>
  );
}
