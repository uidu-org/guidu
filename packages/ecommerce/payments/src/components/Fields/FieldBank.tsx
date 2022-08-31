import { IbanElement } from '@stripe/react-stripe-js';
import { noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldBase } from '../../styled';
import { createIbanElementOptions } from '../../utils';

function FieldBank({
  onChange = noop,
  providerProps,
  onReady,
  onSetValue,
  name,
  ...rest
}) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue: '',
    onChange,
    ...rest,
  });

  const handleChange = (value) => {
    field.onChange(value);
    onChange(name, value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldBase ref={field.ref} {...inputProps}>
        <IbanElement
          id="credit-card"
          onChange={handleChange}
          options={createIbanElementOptions({
            supportedCountries: ['SEPA'],
            ...providerProps,
          })}
          onBlur={field.onBlur}
          onReady={onReady}
        />
      </FieldBase>
    </Wrapper>
  );
}

export default FieldBank;
