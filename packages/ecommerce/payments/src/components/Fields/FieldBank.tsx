import { IbanElement } from '@stripe/react-stripe-js';
import {
  StripeIbanElement,
  StripeIbanElementChangeEvent,
  StripeIbanElementOptions,
} from '@stripe/stripe-js';
import { FieldBaseProps, noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldBase } from '../../styled';
import { createIbanElementOptions } from '../../utils';

function FieldBank({
  onChange = noop,
  providerProps,
  onReady,
  name,
  ...rest
}: {
  providerProps: StripeIbanElementOptions;
  onReady?: (element: StripeIbanElement) => void;
} & FieldBaseProps<string>) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue: '',
    onChange,
    ...rest,
  });

  const handleChange = (event: StripeIbanElementChangeEvent) => {
    field.onChange(event.bankName);
    onChange(name, event.bankName);
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
