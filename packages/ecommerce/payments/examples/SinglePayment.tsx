import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Payments, PayWithBank, PayWithCard } from '../src';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

const createPaymentIntent = (amount: number) => {
  return axios
    .post('https://uidu.local:8443/payment-intents', {
      amount,
      description: 'Donation to Organization',
    })
    .then(res => res.data);
};

export default function Basic({}) {
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [provider, setProvider] = useState('card');
  useEffect(() => {
    createPaymentIntent(3000).then(setPaymentIntent);
    return () => {
      setPaymentIntent(null);
    };
  }, []);

  return (
    <IntlProvider locale="en">
      <div className="container my-5">
        <h5>Buying a single product or donate once with amount of 30 €</h5>
        <p>
          This form should receive paymentIntent['client_secret'] and handle
          payment and errors.
        </p>
        <ul className="nav nav-pills mb-3">
          {['card', 'bank_account'].map(p => (
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link${provider === p ? ' active' : ''}`}
                onClick={e => {
                  e.preventDefault();
                  setProvider(p);
                }}
              >
                Pay with {p}
              </a>
            </li>
          ))}
        </ul>
        <Payments
          stripe={stripe}
          label="Test"
          amount={3000}
          onSave={console.log}
          clientSecret={paymentIntent?.client_secret}
          provider={{ id: provider }}
        >
          {paymentProps => {
            if (provider === 'bank_account') {
              return (
                <PayWithBank
                  {...paymentProps}
                  provider={{ name: 'Credit card', id: 'card' }}
                  providerProps={{ hidePostalCode: true }}
                  scope="donations"
                />
              );
            }

            return (
              <PayWithCard
                {...paymentProps}
                provider={{ name: 'Credit card', id: 'card' }}
                providerProps={{ hidePostalCode: true }}
                scope="donations"
              />
            );
          }}
        </Payments>
      </div>
    </IntlProvider>
  );
}
