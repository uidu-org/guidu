import { CardCvcElement } from '@stripe/react-stripe-js';
import { Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldBase } from '../../styled';
import { createCardElementOptions } from '../../utils';

function FieldCardCvc({
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
        <CardCvcElement
          id="credit-card-cvc"
          onChange={handleChange}
          options={createCardElementOptions({ ...providerProps })}
          onReady={onReady}
        />
      </FieldBase>
    </Wrapper>
  );
}

export default FieldCardCvc;
