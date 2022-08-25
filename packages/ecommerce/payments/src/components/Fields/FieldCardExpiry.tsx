import { CardExpiryElement } from '@stripe/react-stripe-js';
import { Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldBase } from '../../styled';
import { createCardElementOptions } from '../../utils';

function FieldCardExpiry({
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
      <FieldBase>
        <CardExpiryElement
          id="credit-card-expiry"
          onChange={handleChange}
          options={createCardElementOptions({ ...providerProps })}
          onReady={onReady}
        />
      </FieldBase>
    </Wrapper>
  );
}

export default FieldCardExpiry;
