/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

interface Props {
  onClick?: React.MouseEventHandler;
  fit: boolean;
  children: React.ReactNode;
}

export default ({ fit, children, ...rest }: Props) => (
  <span
    css={{
      alignSelf: 'center',
      display: 'inline-flex',
      flexWrap: 'nowrap',
      maxWidth: '100%',
      position: 'relative',
      ...(fit && { width: '100%' }),
      ...(fit && { justifyContent: 'center' }),
    }}
    {...rest}
  >
    {children}
  </span>
);
