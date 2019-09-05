import Spinner from '@uidu/spinner';
import React from 'react';
import ShellBody from './ShellBody';

export default () => {
  return (
    <ShellBody
      shadowOnScroll={false}
      className="d-flex align-items-center justify-content-center"
    >
      <Spinner />
    </ShellBody>
  );
};
