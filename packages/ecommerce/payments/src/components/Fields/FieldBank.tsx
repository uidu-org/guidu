import { IbanElement } from '@stripe/react-stripe-js';
import { ComponentHOC, Wrapper } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import React from 'react';
import { createIbanElementOptions } from '../../utils';

function FieldBank({
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
      <IbanElement
        id="credit-card"
        onChange={handleChange}
        options={createIbanElementOptions({
          supportedCountries: ['SEPA'],
          ...providerProps,
        })}
        onReady={onReady}
      />
    </Wrapper>
  );
}

export default withFormsy(ComponentHOC(FieldBank));
