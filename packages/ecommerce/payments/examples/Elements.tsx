import { Elements as StripeElements } from '@stripe/react-stripe-js';
import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { PayWithBank, PayWithCard } from '../src';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

export default class Elements extends Component<any> {
  render() {
    return (
      <IntlProvider locale="en">
        <StripeElements
          stripe={stripe}
          options={{
            fonts: [
              { cssSrc: 'https://fonts.googleapis.com/css?family=Rubik' },
            ],
          }}
        >
          <>
            <div className="mb-5">
              <PayWithCard
                providerProps={{ hidePostalCode: true }}
                scope="donations"
              />
            </div>
            <PayWithBank
              providerProps={{ hidePostalCode: true }}
              scope="secondary"
              handleSubmit={console.log}
            />
          </>
        </StripeElements>
      </IntlProvider>
    );
  }
}
