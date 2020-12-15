import {
  CardElement,
  Elements,
  IbanElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { PaymentIntent } from '@stripe/stripe-js';
import React, { useState } from 'react';
import usePaymentRequest from '../hooks/usePaymentRequest';
import { RecurringPaymentProps } from '../types';

function RecurringPayment({
  scope = 'primary',
  children,
  onSave = (paymentIntent: PaymentIntent, model: any) => Promise.resolve(),
  amount,
  createSubscription,
  stripeBillingDetails,
  ...rest
}: RecurringPaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const paymentRequest = usePaymentRequest({
    amount,
    ...rest,
  });

  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const stripePaymentIntentHandler = async (subscription) => {
    // eslint-disable-next-line camelcase
    const { latest_invoice } = subscription;
    // eslint-disable-next-line camelcase
    const { payment_intent } = latest_invoice;

    // eslint-disable-next-line camelcase
    if (payment_intent) {
      // eslint-disable-next-line camelcase
      const { client_secret, status } = payment_intent;

      if (status === 'requires_action') {
        const {
          error: stripeError,
          paymentIntent,
        } = await stripe.confirmCardPayment(client_secret);
        if (stripeError) {
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc)
          setError(stripeError);
          setLoading(false);
        } else {
          // Show a success message to your customer
          // setLoading(false);
          onSave(paymentIntent);
        }
      } else {
        // No additional information was needed
        // Show a success message to your customer
        // setLoading(false);
        onSave(payment_intent);
      }
    }
  };

  const stripePaymentMethodHandler = (payload, model) => {
    if (payload.error) {
      // Show error in payment form
      setError(payload.error);
      setLoading(false);
    } else {
      createSubscription({ ...payload, ...model })
        .then(stripePaymentIntentHandler)
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  };

  const handleCardPayment = async (model) => {
    const cardElement = elements.getElement(CardElement);

    if (error) {
      cardElement.focus();
      return;
    }

    if (loading) {
      return;
    }

    if (cardComplete) {
      setLoading(true);
    }

    const payload = await stripe.createPaymentMethod({
      card: cardElement,
      type: 'card',
    });
    stripePaymentMethodHandler(payload, model);
  };

  const handleBankPayment = async (model) => {
    const iban = elements.getElement(IbanElement);

    setLoading(true);

    const payload = await stripe.createPaymentMethod({
      sepa_debit: iban,
      type: 'sepa_debit',
      billing_details: stripeBillingDetails,
    });
    stripePaymentMethodHandler(payload, model);
  };

  const handleSubmit = async (provider, model) => {
    if (provider.id === 'card') {
      handleCardPayment(model);
    } else if (provider.id === 'bank_account') {
      handleBankPayment(model);
    } else {
      throw 'not supported';
    }
  };

  const onChange = (_name, value) => {
    setError(value.error);
    setCardComplete(value.complete);
  };

  return (children as any)({
    handleSubmit,
    loading,
    error,
    canSubmit: !!stripe && !loading,
    onChange,
    paymentRequest,
    ...rest,
  });
}

export default ({
  stripe,
  stripeOptions = {},
  ...rest
}: RecurringPaymentProps) => (
  <Elements
    stripe={stripe}
    options={{
      fonts: [
        {
          cssSrc:
            'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap',
        },
      ],
      ...stripeOptions,
    }}
  >
    <RecurringPayment {...(rest as RecurringPaymentProps)} />
  </Elements>
);
