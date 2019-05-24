import React from 'react';
import { Wrapper } from '../styled';
import { ShellProps } from '../types';

export default function Shell({
  fixedHeight = true,
  children,
  ...otherProps
}: ShellProps) {
  return (
    <Wrapper fixedHeight={fixedHeight} {...otherProps}>
      {children}
    </Wrapper>
  );
}
