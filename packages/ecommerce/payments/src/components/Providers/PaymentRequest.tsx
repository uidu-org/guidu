import {
  ElementsConsumer,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';

function PaymentRequest({ paymentRequest }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
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
        onReady={() => setIsLoading(false)}
      />
    </div>
  );
}

export default (rest) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <PaymentRequest stripe={stripe} elements={elements} {...rest} />
    )}
  </ElementsConsumer>
);
