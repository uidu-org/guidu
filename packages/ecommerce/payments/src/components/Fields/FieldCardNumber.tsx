import { CardNumberElement } from '@stripe/react-stripe-js';
import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldBase } from '../../styled';
import { createCardElementOptions } from '../../utils';

function FieldCardNumber({ onChange, providerProps, onReady, name, ...rest }) {
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
      <FieldBase {...inputProps} ref={field.ref}>
        <CardNumberElement
          id="credit-card-number"
          onChange={handleChange}
          options={createCardElementOptions({ ...providerProps })}
          onReady={onReady}
        />
      </FieldBase>
    </Wrapper>
  );
}

export default FieldCardNumber;
