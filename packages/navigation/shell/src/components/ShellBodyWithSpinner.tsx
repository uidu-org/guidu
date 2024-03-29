import Spinner from '@uidu/spinner';
import React from 'react';
import ShellBody from './ShellBody';

export default function ShellBodyWithSpinner({
  className,
}: {
  className?: string;
}) {
  return (
    <ShellBody
      tw="h-full flex items-center justify-center"
      className={className}
    >
      <Spinner />
    </ShellBody>
  );
}
