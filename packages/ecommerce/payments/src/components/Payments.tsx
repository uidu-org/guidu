import {
  CardElement,
  Elements,
  IbanElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { PaymentsProps } from '../types';

// https://stripe.com/docs/payments/save-during-payment#web
// https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/1-Card-Detailed.js

function Payments({
  scope = 'primary',
  children,
  provider,
  amount,
  clientSecret,
  onSuccess,
  ...rest
}: PaymentsProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCardPayment = async (formData) => {
    const cardElement = elements.getElement(CardElement);

    if (error) {
      cardElement.focus();
      return;
    }

    if (cardComplete) {
      setLoading(true);
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
      setup_future_usage: 'off_session',
    });

    if (payload.error) {
      // Show error to your customer
      setLoading(false);
      setError(payload.error);
    } else {
      if (payload.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback execution
        // Set up a webhook or plugin to listen for the payment_intent.succeeded event
        // to save the card to a Customer
        // The PaymentMethod ID can be found on result.paymentIntent.payment_method
        onSuccess(payload);
        setLoading(false);
      }
    }
  };

  const handleBankPayment = async (formData) => {
    const iban = elements.getElement(IbanElement);

    setLoading(true);

    const payload = await stripe.confirmSepaDebitPayment(clientSecret, {
      payment_method: {
        sepa_debit: iban,
        billing_details: {
          name: 'test',
          email: 'andrea.vanini@uidu.org',
        },
      },
    });

    if (payload.error) {
      // Show error to your customer.
      setLoading(false);
      setError(payload.error);
    } else {
      // Show a confirmation message to your customer.
      // The PaymentIntent is in the 'processing' state.
      // SEPA Direct Debit payments are asynchronous,
      // so funds are not immediately available.
      onSuccess(payload);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log(formData);

    if (provider.id === 'card') {
      handleCardPayment(formData);
    } else if (provider.id === 'bank_account') {
      handleBankPayment(formData);
    } else {
      console.log('not supported');
    }
  };

  const onChange = (e) => {
    setError(e.error);
    setCardComplete(e.complete);
  };

  return (children as any)({
    handleSubmit,
    loading,
    error,
    canSubmit: !!stripe,
    onChange,
    ...rest,
  });
}

export default ({ stripe, stripeOptions = {}, ...rest }: PaymentsProps) => (
  <Elements
    stripe={stripe}
    options={{
      fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Muli' }],
      ...stripeOptions,
    }}
  >
    <Payments {...(rest as PaymentsProps)} />
  </Elements>
);
