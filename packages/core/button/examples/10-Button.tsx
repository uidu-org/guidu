import * as React from 'react';
import { MemoryRouter } from 'react-router';
import Button, { RouterButton } from '..';

console.log(Button);

export default () => (
  <MemoryRouter>
    <RouterButton
      to={{ pathname: '/', state: { foo: 'bar' } }}
      tw="bg-red-200 text-red-700"
      appearance="primary"
    >
      Button
    </RouterButton>
    <Button
      forwardedAs={'a'}
      href="https://uidu.org"
      appearance="primary"
      tw="bg-red-500"
    >
      test button with styling
    </Button>
    <Button appearance="primary" tw="bg-red-500">
      test button with styling
    </Button>
  </MemoryRouter>
);
