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
      fontSize: '15px',
      color: 'var(--body-color)',
      fontFamily: 'Rubik',
      '::placeholder': {
        color: '#868e96',
        fontWeight: 400,
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
