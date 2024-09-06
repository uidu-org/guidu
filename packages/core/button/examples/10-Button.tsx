import * as React from 'react';
import { MemoryRouter } from 'react-router';
import Button from '..';

console.log(Button);

export default () => (
  <MemoryRouter>
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
