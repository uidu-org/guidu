import {
  CardElement,
  Elements,
  IbanElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { SubscriptionProps } from '../types';

function Subscription({
  scope = 'primary',
  children,
  provider,
  onSuccess,
  createSubscription,
  stripeBillingDetails,
  ...rest
}: SubscriptionProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const stripePaymentIntentHandler = async (subscription) => {
    const { latest_invoice } = subscription;
    const { payment_intent } = latest_invoice;

    if (payment_intent) {
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
          setLoading(false);
          onSuccess(paymentIntent);
        }
      } else {
        // No additional information was needed
        // Show a success message to your customer
        setLoading(false);
        onSuccess(payment_intent);
      }
    }
  };

  const stripePaymentMethodHandler = (payload) => {
    if (payload.error) {
      // Show error in payment form
      setError(payload.error);
      setLoading(false);
    } else {
      createSubscription(payload)
        .then(stripePaymentIntentHandler)
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  };

  const handleCardPayment = async (formData) => {
    const cardElement = elements.getElement(CardElement);

    if (error) {
      cardElement.focus();
      return;
    }

    if (cardComplete) {
      setLoading(true);
    }

    const payload = await stripe.createPaymentMethod({
      card: cardElement,
      type: 'card',
    });
    stripePaymentMethodHandler(payload);
  };

  const handleBankPayment = async (formData) => {
    const iban = elements.getElement(IbanElement);

    setLoading(true);

    const payload = await stripe.createPaymentMethod({
      sepa_debit: iban,
      type: 'sepa_debit',
      billing_details: stripeBillingDetails,
    });
    stripePaymentMethodHandler(payload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

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

export default ({ stripe, stripeOptions = {}, ...rest }: SubscriptionProps) => (
  <Elements
    stripe={stripe}
    options={{
      fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Muli' }],
      ...stripeOptions,
    }}
  >
    <Subscription {...(rest as SubscriptionProps)} />
  </Elements>
);
