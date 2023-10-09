import { CardElement, CardElementProps } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import { FieldBaseProps, noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import { FieldBase } from '../../styled';
import { createCardElementOptions } from '../../utils';

function FieldCard({
  onChange = noop,
  providerProps,
  onReady = noop,
  name,
  ...rest
}: FieldBaseProps<StripeCardElementChangeEvent['value']> & {
  onReady?: CardElementProps['onReady'];
  providerProps: CardElementProps;
}) {
  const { field, inputProps, wrapperProps } = useController({
    name,
    onChange,
    ...rest,
  });

  const handleChange = (event: StripeCardElementChangeEvent) => {
    field.onChange(event.value);
    onChange(name, event.value);
  };

  return (
    <Wrapper {...wrapperProps}>
      <FieldBase ref={field.ref} {...inputProps}>
        <CardElement
          id="credit-card"
          onChange={handleChange}
          options={createCardElementOptions({ ...providerProps })}
          onReady={onReady}
        />
      </FieldBase>
    </Wrapper>
  );
}

export default FieldCard;
