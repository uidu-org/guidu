import React from 'react';
import { HeadingItemProps } from '../types';

const HeadingItem = ({ children, testId, id, ...rest }: HeadingItemProps) => {
  return (
    <div
      tw="uppercase text-sm font-semibold text-muted py-0 px-5"
      data-testid={testId}
      data-ds--menu--heading-item
      id={id}
      {...rest}
    >
      {children}
    </div>
  );
};

export default HeadingItem;
