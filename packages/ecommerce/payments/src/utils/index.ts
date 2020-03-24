import {
  StripeCardElementOptions,
  StripeIbanElementOptions,
} from '@stripe/stripe-js';

const defaultOptions = {
  classes: {
    base: 'form-control',
  },
  style: {
    base: {
      fontSize: '16px',
      color: '#495057',
      fontFamily: 'Muli',
      '::placeholder': {
        color: '#868e96',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export const createCardElementOptions = (
  overrides = {},
): StripeCardElementOptions => ({
  ...defaultOptions,
  ...overrides,
});

export const createIbanElementOptions = (
  overrides = {},
): StripeIbanElementOptions => ({
  ...defaultOptions,
  ...overrides,
});
