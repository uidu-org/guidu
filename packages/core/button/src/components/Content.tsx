/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { gridSize } from '@uidu/theme';
import { getLoadingStyle } from './utils';

interface Props {
  followsIcon: boolean;
  spacing: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default ({
  children,
  followsIcon,
  spacing,
  isLoading,
  ...rest
}: Props) => (
  <span
    css={{
      alignItems: followsIcon ? 'baseline' : 'center',
      alignSelf: followsIcon ? 'baseline' : 'center',
      flex: '1 1 auto',
      margin: spacing === 'none' ? 0 : `0 ${gridSize() / 2}px`,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      ...getLoadingStyle(isLoading),
    }}
    {...rest}
  >
    {children}
  </span>
);
