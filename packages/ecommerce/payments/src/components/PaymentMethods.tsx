import {
  ElementsConsumer,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import React, { PureComponent } from 'react';
import { CreditCard, Server } from 'react-feather';
import { PayWithProps } from '../types';

class PayWith extends PureComponent<PayWithProps, any> {
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

    paymentRequest.on('paymentMethod', async ev => {
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
      .then(result => this.setState({ canMakePayment: !!result }));

    this.state = {
      canMakePayment: false,
      paymentRequest,
      loading: false,
    };
  }

  select = (e, provider) => {
    const { onChange } = this.props;
    e.preventDefault();
    onChange({ id: provider, name: provider });
  };

  render() {
    const { canMakePayment, paymentRequest } = this.state;

    return (
      <div>
        {canMakePayment && (
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: {
                  theme: 'dark',
                  height: 48,
                },
              },
            }}
            className="PaymentRequestButton mb-3"
          />
        )}
        <a
          className="card card-body p-3 mb-3"
          href="#"
          onClick={e => this.select(e, 'card')}
        >
          <div className="d-flex w-100 justify-content-start align-items-center">
            <CreditCard className="mr-2" size={18} />
            <div className="mr-auto">
              <h6 className="mb-0">Inserisci i dati della tua carta</h6>
            </div>
          </div>
        </a>
        <a
          className="card card-body p-3 mb-3"
          href="#"
          onClick={e => this.select(e, 'bank_account')}
        >
          <div className="d-flex w-100 justify-content-start align-items-center">
            <Server className="mr-2" size={18} />
            <div className="mr-auto">
              <h6 className="mb-0">Utilizza l'IBAN</h6>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default rest => (
  <ElementsConsumer>
    {({ stripe, elements }) => (
      <PayWith stripe={stripe} elements={elements} {...rest} />
    )}
  </ElementsConsumer>
);
