import axios from 'axios';

export const createOptions = (overrides = {}) => ({
  options: {
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
    ...overrides,
  },
});

export const createPaymentIntent = (stripeCustomerId, amount: number) => {
  return axios
    .post('https://uidu.local:8443/payment-intents', {
      amount,
      stripeCustomerId,
    })
    .then(res => res.data);
};
