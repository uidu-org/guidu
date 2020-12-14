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
              {
                cssSrc:
                  'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap',
              },
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
