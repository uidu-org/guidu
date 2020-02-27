import axios from 'axios';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { PayWithBank, PayWithCard, Subscription } from '../src';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

const createPaymentIntent = (amount: number) => {
  return axios
    .post('https://uidu.local:8443/payment-intents', {
      amount,
    })
    .then(res => res.data);
};

const createSubscription = payload => {
  return axios
    .post('https://uidu.local:8443/create-customer', {
      payment_method_id: payload.paymentMethod.id,
      plan: 1,
    })
    .then(res => res.data);
};

export default function SubscriptionExample({}) {
  const [provider, setProvider] = useState('card');

  return (
    <IntlProvider locale="en">
      <div className="container my-5">
        <h5>Subscribe to a plan with a recurring amount of 30 €</h5>
        <p>
          This form should receive info about the plan and return payment
          methods
        </p>
        <ul className="nav nav-pills mb-3">
          {['card', 'bank_account'].map(p => (
            <li className="nav-item" key={p}>
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
        <Subscription
          stripe={stripe}
          label="Test"
          amount={3000}
          provider={{ id: provider }}
          createSubscription={payload => createSubscription(payload)}
          onSuccess={payload => {
            console.log(payload);
            window.alert('success');
          }}
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
        </Subscription>
      </div>
    </IntlProvider>
  );
}
