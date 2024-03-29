import { CardElement, Elements } from '@stripe/react-stripe-js';
import Form from '@uidu/form';
import { createCardElementOptions } from '@uidu/payments';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { Element } from 'react-scroll';

class PaymentSources extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      paymentFormSubmitted: false,
    };
  }

  handleCharge = (token) => {
    const { onSave, updateCurrentUser } = this.props;
    // this.disableButton();
    // apiCall('post', '/dashboard/sources', { token }).then(response =>
    //   console.log(response),
    // );
    // Messenger().run(
    //   {
    //     successMessage: 'Impostazioni aggiornate con successo',
    //     errorMessage: "C'è stato un errore, riprova",
    //     progressMessage: I18n.t('utils.flash.processing'),
    //     retry: false,
    //   },
    //   {
    //     url: '/sources',
    //     type: 'POST',
    //     data: { token, authenticity_token: Uidu.csrfToken },
    //     xhrFields: { withCredentials: true },
    //     crossDomain: true,
    //     dataType: 'text json',
    //     cache: false,
    //     success: response => {
    //       onSave(response);
    //     },
    //   },
    // );
  };

  handleSubmit = async (model) => {
    const { stripe, currentUser } = this.props;
    this.setState({
      loading: true,
      formError: null,
    });

    stripe.createToken({ name: currentUser.name }).then(({ token }) => {
      console.log(token);
      if (!token) {
        return this.setState({
          loading: false,
          formError: 'Completa i dati',
        });
      }
      return this.handleCharge(token);
    });
  };

  render() {
    const { currentUser, paymentFormSubmitted, paymentFormError } = this.props;
    const { loading, formError, canMakePayment, paymentRequest } = this.state;

    return (
      <Element name="sources" className="card mb-md-5">
        <div className="card-header d-none d-md-block">Metodo di pagamento</div>
        <div className="p-3 p-md-4">
          {(currentUser.stripeSources || [])
            .sort((a, b) => {
              if (b.kind === 'default') {
                return 1;
              }
              return -1;
            })
            .map((stripeSource) => (
              <div className="p-3 mb-3 card">
                <div className="media align-items-center">
                  <img
                    // src={require(`payment-icons/min/flat/${stripeSource.stripeCard.brand.toLowerCase()}.svg`)}
                    alt={stripeSource.stripeCard.brand}
                    className="mr-3"
                    style={{ width: '3rem' }}
                  />
                  <div className="media-body">
                    {stripeSource.kind === 'default' && (
                      <p className="mb-0 text-muted small">
                        Questo account è associato a
                      </p>
                    )}
                    <p className="mb-1">
                      <b>{stripeSource.stripeCard.brand}</b>{' '}
                      <small>
                        **** **** **** {stripeSource.stripeCard.last4}
                      </small>
                      - scadenza {stripeSource.stripeCard.exp_month}/
                      {stripeSource.stripeCard.exp_year}
                    </p>
                    <p className="mb-0 small">
                      {stripeSource.kind !== 'default' && [
                        <a className="mr-3" href="#">
                          Rendi default
                        </a>,
                        <a href="#">Rimuovi carta</a>,
                      ]}
                    </p>
                  </div>
                  {stripeSource.kind === 'default' && (
                    <a className="mr-2 badge badge-light">DEFAULT</a>
                  )}
                </div>
              </div>
            ))}
          <div
            className={classNames('', {
              'animated shake': formError || paymentFormError,
            })}
          >
            <Form
              handleSubmit={this.handleSubmit}
              footerRenderer={(props) => <button>Invia</button>}
            >
              {(formError || paymentFormError) && (
                <div className="mb-3 alert alert-danger animated zoomIn">
                  {formError || paymentFormError}
                </div>
              )}
              <div className="form-group">
                <label className="control-label" htmlFor="credit-card">
                  Numero carta di credito
                </label>
                <CardElement
                  id="credit-card"
                  options={createCardElementOptions({ hidePostalCode: true })}
                />
              </div>
            </Form>
          </div>
        </div>
      </Element>
    );
  }
}

export default ({ stripe, ...rest }) => (
  <Elements stripe={stripe}>
    <PaymentSources stripe={stripe} {...rest} />
  </Elements>
);
