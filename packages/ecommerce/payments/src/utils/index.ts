import {
  StripeCardElementOptions,
  StripeIbanElementOptions,
} from '@stripe/stripe-js';

const defaultOptions = {
  disableLink: true,
  classes: {},
  style: {
    // base: {
    //   iconColor: '#c4f0ff',
    //   color: 'rgb(var(--body-primary-color))',
    //   fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    //   fontSize: '16px',
    //   fontSmoothing: 'antialiased',
    //   ':-webkit-autofill': {
    //     color: '#fce883',
    //   },
    //   '::placeholder': {
    //     color: '#87BBFD',
    //   },
    // },
    base: {
      fontSize: '15px',
      color: 'var(--body-color)',
      fontFamily: 'Inter',
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
