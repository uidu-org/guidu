import * as React from 'react';
import { RouterButton } from '..';

export default () => (
  <div>
    <RouterButton
      to={{ pathname: '/', state: { foo: 'bar' } }}
      tw="bg-red-200 text-red-700"
    >
      Button
    </RouterButton>
  </div>
);
