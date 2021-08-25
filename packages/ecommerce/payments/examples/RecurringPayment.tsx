import { FormSectionSubmit } from '@uidu/form';
import axios from 'axios';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { PayWithBank, PayWithCard, RecurringPayment } from '../src';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

const createSubscription = (payload) => {
  return axios
    .post('https://uidu.local:8443/create-customer', {
      payment_method_id: payload.paymentMethod.id,
      plan: 1,
    })
    .then((res) => res.data);
};

export default function RecurringPaymentExample({}) {
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
          {['card', 'bank_account'].map((p) => (
            <li className="nav-item" key={p}>
              <a
                href="#"
                className={`nav-link${provider === p ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setProvider(p);
                }}
              >
                Pay with {p}
              </a>
            </li>
          ))}
        </ul>
        <RecurringPayment
          stripe={stripe}
          label="Test"
          amount={3000}
          provider={{ id: provider }}
          createSubscription={(payload) => createSubscription(payload)}
          onSave={(payload) => {
            console.log(payload);
            window.alert('success');
          }}
          footerRenderer={(props) => (
            <FormSectionSubmit {...props} label="Donate 30" scope="primary" />
          )}
        >
          {(paymentProps) => {
            if (provider === 'bank_account') {
              return (
                <PayWithBank
                  {...paymentProps}
                  provider={{ name: 'Credit card', id: 'card' }}
                  providerProps={{ hidePostalCode: true }}
                />
              );
            }

            return (
              <PayWithCard
                {...paymentProps}
                provider={{ name: 'Credit card', id: 'card' }}
                providerProps={{ hidePostalCode: true }}
              />
            );
          }}
        </RecurringPayment>
      </div>
    </IntlProvider>
  );
}
