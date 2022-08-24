import React from 'react';
import { theme } from 'twin.macro';
import { HelpProps } from './types';

export default function Help({ help, id }: HelpProps) {
  return (
    <div
      tw="mt-2 text-sm"
      css={{ color: `var(--form-hint-color, ${theme`colors.gray.400`})` }}
      id={`${id}-desc`}
    >
      {help}
    </div>
  );
}
