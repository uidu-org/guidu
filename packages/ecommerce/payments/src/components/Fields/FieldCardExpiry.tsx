import { CardExpiryElement } from '@stripe/react-stripe-js';
import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldBase } from '../../styled';
import { createCardElementOptions } from '../../utils';

function FieldCardExpiry({ onChange, providerProps, onReady, name, ...rest }) {
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
      <FieldBase {...inputProps}>
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
