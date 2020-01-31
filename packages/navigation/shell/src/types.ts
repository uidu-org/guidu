import * as React from 'react';

export interface ShellProps {
  children: React.ReactNode;
  fixedHeight?: boolean | 'mobileOnly';
  id?: string;
}
