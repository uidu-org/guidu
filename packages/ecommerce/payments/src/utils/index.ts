import axios from 'axios';

export const createOptions = () => ({
  style: {
    base: {
      fontSize: '16px',
      color: '#495057',
      fontFamily: 'Avenir',
      '::placeholder': {
        color: '#868e96',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
});

export const generatePaymentIntent = (amount: number) => {
  return axios
    .post('https://uidu.local:8443/payment-intents', {
      amount,
    })
    .then(res => res.data);
};
