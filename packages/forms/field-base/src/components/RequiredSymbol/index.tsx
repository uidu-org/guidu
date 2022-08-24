import React from 'react';
import { RequiredSymbolProps } from './types';

export default function RequiredSymbol({
  symbol = ' *',
  required,
}: RequiredSymbolProps) {
  if (required === true) {
    return <small tw="text-gray-500">{symbol}</small>;
  }
  return null;
}
