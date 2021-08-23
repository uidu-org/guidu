import React from 'react';
import { RequiredSymbolProps } from './types';

export default function RequiredSymbol({
  symbol = ' *',
  required,
}: RequiredSymbolProps) {
  if (required === true) {
    return (
      <>
        <small className="text-muted">{symbol}</small>
      </>
    );
  }
  return null;
}
