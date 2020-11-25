import {
  ElementsConsumer,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import React from 'react';

function PaymentRequest({ paymentRequest }) {
  return (
    <PaymentRequestButtonElement
      options={{
        paymentRequest,
        style: {
          paymentRequestButton: {
            theme: 'dark',
            height: '48px',
          },
        },
      }}
      className="PaymentRequestButton"
    />
  );
}

export default (rest) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <PaymentRequest stripe={stripe} elements={elements} {...rest} />
    )}
  </ElementsConsumer>
);
