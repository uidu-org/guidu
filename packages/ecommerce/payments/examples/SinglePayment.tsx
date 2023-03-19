import FieldText from '@uidu/field-text';
import { FormSubmit } from '@uidu/form';
import {
  ScrollableContainer,
  ShellBody,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { PaymentMethods, SinglePayment } from '../src';

const stripe = window.Stripe('pk_test_gxaXiVZYxYA1u1ZzqjVr71c5');

const createPaymentIntent = (amount: number) =>
  axios
    .post('https://uidu.local:8443/payment-intents', {
      amount,
      description: 'Donation to Organization',
    })
    .then((res) => res.data);

export default function Basic() {
  const [paymentIntent, setPaymentIntent] = useState(null);

  useEffect(() => {
    createPaymentIntent(3000).then(setPaymentIntent);
    return () => {
      setPaymentIntent(null);
    };
  }, []);

  return (
    <IntlProvider locale="en">
      <ShellSidebar className="p-5 d-flex border-right align-items-center justify-content-center">
        <div>
          <h5>Buying a single product or donate once with amount of 30 €</h5>
          <p>
            This form should receive paymentIntent['client_secret'] and handle
            payment and errors.
          </p>
        </div>
      </ShellSidebar>
      <ShellMain>
        <ShellBody>
          <ScrollableContainer>
            <div tw="container p-5 my-5">
              <div tw="flex justify-center">
                <div tw="w-9/12">
                  <SinglePayment
                    formProps={{
                      id: 'test-1',
                    }}
                    stripe={stripe}
                    label="Test"
                    amount={3000}
                    onSave={async (paymentIntent, model) => {
                      await console.log(paymentIntent);
                    }}
                    clientSecret={paymentIntent?.client_secret}
                    providers={[
                      'credit_card',
                      'credit_card_split',
                      'bank_account',
                    ]}
                    footerRenderer={(props) => (
                      <FormSubmit {...props} form="test-1" label="Donate 30" />
                    )}
                  >
                    {(paymentProps) => (
                      <PaymentMethods {...paymentProps}>
                        <FieldText name="otherField" label="other field" />
                      </PaymentMethods>
                    )}
                  </SinglePayment>
                </div>
              </div>
            </div>
          </ScrollableContainer>
        </ShellBody>
      </ShellMain>
    </IntlProvider>
  );
}
