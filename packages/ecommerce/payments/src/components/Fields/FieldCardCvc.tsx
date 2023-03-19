import { CardCvcElement } from '@stripe/react-stripe-js';
import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldBase } from '../../styled';
import { createCardElementOptions } from '../../utils';

function FieldCardCvc({ onChange, providerProps, onReady, name, ...rest }) {
  const { field, inputProps, wrapperProps } = useController({
    name,
    onChange,
    ...rest,
  });

  const handleChange = (value) => {
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...wrapperProps}>
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
