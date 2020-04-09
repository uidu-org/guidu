import {
  ElementsConsumer,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import React, { PureComponent } from 'react';
import { PayWithProps } from '../../types';

class PaymentRequest extends PureComponent<PayWithProps, any> {
  constructor(props) {
    super(props);
    console.log(props);
    const { label, amount, stripe, paymentIntent } = props;
    const paymentRequest = stripe.paymentRequest({
      country: 'IT',
      currency: 'eur',
      total: {
        label,
        amount,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
    });

    paymentRequest.on('paymentMethod', async (ev) => {
      const {
        error: confirmError,
        // paymentIntent,
      } = await stripe.confirmPaymentIntent(paymentIntent, {
        payment_method: ev.paymentMethod.id,
      });
      if (confirmError) {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.
        ev.complete('fail');
      } else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        ev.complete('success');
        // Let Stripe.js handle the rest of the payment flow.
        const { error } = await stripe.handleCardPayment(paymentIntent);
        if (error) {
          // The payment failed -- ask your customer for a new payment method.
        } else {
          // The payment has succeeded.
        }
      }
    });

    paymentRequest
      .canMakePayment()
      .then((result) => this.setState({ canMakePayment: !!result }));

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  render() {
    const { canMakePayment, paymentRequest } = this.state;

    if (!canMakePayment) {
      return null;
    }
    return (
      <PaymentRequestButtonElement
        options={{
          paymentRequest,
          style: {
            paymentRequestButton: {
              theme: 'dark',
              height: '48',
            },
          },
        }}
        className="PaymentRequestButton mb-3"
      />
    );
  }
}

export default (rest) => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <PaymentRequest stripe={stripe} elements={elements} {...rest} />
    )}
  </ElementsConsumer>
);
