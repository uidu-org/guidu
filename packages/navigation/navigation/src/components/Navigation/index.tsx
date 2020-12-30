import { ShellHeader } from '@uidu/shell';
import React from 'react';
import ItemsRenderer from '../ItemsRenderer';
import { NavigationProps } from './types';

export default function Navigation({
  position = 'absolute',
  schema,
  className,
  children,
}: NavigationProps) {
  if (!schema && !children) {
    throw 'Navigation needs either a schema or children to render';
  }

  if (schema) {
    return (
      <ShellHeader className={className}>
        <ItemsRenderer items={schema} />
      </ShellHeader>
    );
  }

  return children;
}
