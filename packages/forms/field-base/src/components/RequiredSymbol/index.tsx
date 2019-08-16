import React from 'react';
import { RequiredSymbolProps } from './types';

const RequiredSymbol = (props: RequiredSymbolProps) => {
  if (props.required === false) {
    return null;
  }
  return <span className="required-symbol">{props.symbol}</span>;
};

RequiredSymbol.defaultProps = {
  symbol: ' *',
};

export default RequiredSymbol;
