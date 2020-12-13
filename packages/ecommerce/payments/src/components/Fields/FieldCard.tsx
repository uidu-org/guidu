import { CardElement } from '@stripe/react-stripe-js';
import { ComponentHOC, Wrapper } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import React from 'react';
import { createCardElementOptions } from '../../utils';

function FieldCard({
  onChange,
  providerProps,
  onReady,
  onSetValue,
  name,
  ...rest
}) {
  const handleChange = (value) => {
    onSetValue(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...rest}>
      <CardElement
        id="credit-card"
        onChange={handleChange}
        options={createCardElementOptions({ ...providerProps })}
        onReady={onReady}
      />
    </Wrapper>
  );
}

export default withFormsy(ComponentHOC(FieldCard));
