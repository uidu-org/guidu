import React from 'react';
import { ReactButton } from '../src';

export default function Basic() {
  return (
    <div>
      <div id="container"></div>
      <ReactButton loginContainer="#container" code="123" />
    </div>
  );
}
