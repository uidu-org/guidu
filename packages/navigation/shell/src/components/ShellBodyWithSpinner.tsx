import Spinner from '@uidu/spinner';
import React from 'react';
import ShellBody from './ShellBody';

export default () => {
  return (
    <ShellBody className="h-100 d-flex align-items-center justify-content-center">
      <Spinner />
    </ShellBody>
  );
};
