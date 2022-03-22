import React from 'react';

export default function Cell(params) {
  // if (params.node && params.node.group) {
  //   return null;
  // }

  if (!params || !params.value) {
    return null;
  }

  const value = params.options.filter(
    (option) => option.id === params.value,
  )[0];

  if (!value) {
    return params.value;
  }

  return (
    <>
      <span tw="mr-2.5 flex-shrink-0">{value.before}</span>
      <div tw="truncate">{value.name}</div>
    </>
  );
}
