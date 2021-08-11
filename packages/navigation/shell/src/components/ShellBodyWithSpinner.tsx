import Spinner from '@uidu/spinner';
import React from 'react';
import ShellBody from './ShellBody';

export default () => {
  return (
    <ShellBody tw="h-full flex items-center justify-center">
      <Spinner />
    </ShellBody>
  );
};
