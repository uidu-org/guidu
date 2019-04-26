import React from 'react';
import { Wrapper } from '../styled';

import { ShellProps } from '../types';

export default function Shell({ fixedHeight = true, children }: ShellProps) {
  return <Wrapper fixedHeight={fixedHeight}>{children}</Wrapper>;
}
