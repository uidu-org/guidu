import React from 'react';
import { RequiredSymbolProps } from './types';

const RequiredSymbol = (props: RequiredSymbolProps) => {
  if (props.required === false) {
    return (
      <>
        <small className="text-muted"> - Optional</small>
      </>
    );
  }
  return null;
  // (
  //   <>
  //     <span aria-hidden={true} className="required-symbol">
  //       {props.symbol}
  //     </span>
  //     <span className="sr-only"> Required</span>
  //   </>
  // );
};

RequiredSymbol.defaultProps = {
  symbol: ' *',
};

export default RequiredSymbol;
