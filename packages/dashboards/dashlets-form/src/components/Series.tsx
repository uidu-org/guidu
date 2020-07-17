import React from 'react';

export default function Series({ measures }) {
  console.log(measures);
  return <div>{measures.map((measure) => measure.name)}</div>;
}
