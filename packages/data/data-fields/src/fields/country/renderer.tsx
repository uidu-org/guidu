import React from 'react';

export default (params) => {
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
      <span tw="mr-2.5">{value.before}</span>
      {value.name}
    </>
  );
};
