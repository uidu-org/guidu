import React, { PureComponent } from 'react';
import { Elements, injectStripe, StripeProvider } from 'react-stripe-elements';
import { PaymentsProps, PaymentsState } from '../types';
import { generatePaymentIntent } from '../utils';

class Payments extends PureComponent<PaymentsProps, PaymentsState> {
  static defaultProps = {
    scope: 'primary',
    onPaymentIntentSuccess: console.log,
    onPaymentIntentError: console.log,
    onSourceSuccess: console.log,
    onSourceError: console.log,
  };

  state = {
    paymentIntent: null,
    loading: false,
    formError: null,
  };

  componentDidMount() {
    generatePaymentIntent(this.props.amount).then(response =>
      this.setState({ paymentIntent: response.client_secret }),
    );
  }

  handleSubmit = e => {
    const {
      stripe: { handleCardPayment, createSource },
      provider,
      onPaymentIntentSuccess,
      onPaymentIntentError,
      onSourceSuccess,
      onSourceError,
    } = this.props;
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    this.setState({
      loading: true,
      formError: null,
    });

    switch (provider) {
      case 'bank_account':
        return createSource({
          type: 'sepa_debit',
          currency: 'eur',
          owner: {
            name: 'test',
            email: 'andrea.vanini@uidu.org',
          },
          // @ts-ignore
          mandate: {
            // Automatically send a mandate notification email to your customer
            // once the source is charged.
            notification_method: 'email',
          },
        }).then(({ error, source }) => {
          if (error) {
            return onSourceError(error);
          }
          return onSourceSuccess(source);
        });

      default:
        return handleCardPayment(this.state.paymentIntent, {}).then(
          ({ error, paymentIntent }) => {
            if (error) {
              return onPaymentIntentError(error);
            }
            return onPaymentIntentSuccess(paymentIntent);
          },
        );
    }
  };

  render() {
    const { children, ...rest } = this.props;
    const { paymentIntent } = this.state;

    return (children as any)({
      handleSubmit: this.handleSubmit,
      paymentIntent,
      ...rest,
    });
  }
}

const WithStripePayments = injectStripe(Payments as any);

export default ({ apiKey, ...rest }) => (
  <StripeProvider apiKey={apiKey}>
    <Elements>
      <WithStripePayments {...rest} />
    </Elements>
  </StripeProvider>
);
