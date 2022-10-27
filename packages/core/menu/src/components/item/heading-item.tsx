import React from 'react';
import { HeadingItemProps } from '../types';

function HeadingItem({ children, testId, id, ...rest }: HeadingItemProps) {
  return (
    <div
      tw="uppercase text-xs font-medium text-gray-500 py-0 px-5"
      data-testid={testId}
      data-ds--menu--heading-item
      id={id}
      {...rest}
    >
      {children}
    </div>
  );
}

export default HeadingItem;
