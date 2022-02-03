import { FormSectionSubmit } from '@uidu/form';
import axios from 'axios';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { PaymentMethods, RecurringPayment } from '../src';

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
        <ul className="mb-3 nav nav-pills">
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
          providers={['credit_card', 'credit_card_split', 'bank_account']}
          createSubscription={async (payload) => {
            console.log(payload);
            return createSubscription(payload);
          }}
          stripeBillingDetails={{
            name: 'John Doe',
          }}
          onSave={(payload) => {
            console.log(payload);
            window.alert('success');
          }}
          footerRenderer={(props) => (
            <FormSectionSubmit {...props} label="Donate 30" scope="primary" />
          )}
        >
          {(paymentProps) => {
            return <PaymentMethods {...paymentProps}></PaymentMethods>;
          }}
        </RecurringPayment>
      </div>
    </IntlProvider>
  );
}
