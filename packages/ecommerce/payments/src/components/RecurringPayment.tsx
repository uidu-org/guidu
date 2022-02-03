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

  const stripePaymentIntentHandler = async (subscription, provider) => {
    // eslint-disable-next-line camelcase
    const { latest_invoice } = subscription;
    // eslint-disable-next-line camelcase
    const { payment_intent } = latest_invoice;

    // eslint-disable-next-line camelcase
    if (payment_intent) {
      // eslint-disable-next-line camelcase
      const { client_secret, status } = payment_intent;

      if (status === 'succeeded') {
        setLoading(false);
        onSave(payment_intent, {});
      } else {
        const paymentConfirmationFn =
          provider.id === 'credit_card'
            ? stripe.confirmCardPayment
            : stripe.confirmSepaDebitPayment;
        const { error: stripeError, paymentIntent } =
          await paymentConfirmationFn(client_secret);

        if (stripeError) {
          // Display error message in your UI.
          // The card was declined (i.e. insufficient funds, card has expired, etc)
          setError(stripeError);
          setLoading(false);
        } else {
          // Show a success message to your customer
          // setLoading(false);
          if (paymentIntent.status === 'requires_action') {
          } else {
            // No additional information was needed
            // Show a success message to your customer
            // setLoading(false);
            setLoading(false);
            onSave(paymentIntent, {});
          }
        }
      }
    }
  };

  const stripePaymentMethodHandler = (payload, model, provider) => {
    if (payload.error) {
      // Show error in payment form
      setError(payload.error);
      setLoading(false);
    } else {
      createSubscription({ ...payload, ...model })
        .then((subscription) =>
          stripePaymentIntentHandler(subscription, provider),
        )
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }
  };

  const handleCardPayment = async (model, provider) => {
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
    stripePaymentMethodHandler(payload, model, provider);
  };

  const handleBankPayment = async (model, provider) => {
    const iban = elements.getElement(IbanElement);

    setLoading(true);

    const payload = await stripe.createPaymentMethod({
      sepa_debit: iban,
      type: 'sepa_debit',
      billing_details: stripeBillingDetails,
    });
    stripePaymentMethodHandler(payload, model, provider);
  };

  const handleSubmit = async (provider, model) => {
    if (provider.id === 'credit_card') {
      handleCardPayment(model, provider);
    } else if (provider.id === 'bank_account') {
      handleBankPayment(model, provider);
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
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap',
        },
      ],
      ...stripeOptions,
    }}
  >
    <RecurringPayment {...(rest as RecurringPaymentProps)} />
  </Elements>
);
