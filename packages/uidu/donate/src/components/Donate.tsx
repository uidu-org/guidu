import Payments, { Pay, PayWith } from '@uidu/payments';
import { Shell } from '@uidu/widgets';
// import AnimatedCheck from 'components/AnimatedCheck';
// import ContactForm from 'organization/components/contacts/form';
import React, { Component } from 'react';
import { ArrowLeft, X } from 'react-feather';
import { DonateProps, DonateState } from '../types';
import Donation from './steps/Donation';
import DonationPreferences from './steps/preferences';

export default class Donate extends Component<DonateProps, DonateState> {
  static defaultProps = {
    providers: ['card'],
  };

  private slider = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      donation: props.donation,
      activeSlide: 0,
      provider: 'card',
    };
  }

  createDonation = token => {
    const { donationCampaign, onCreate } = this.props;
    const { donation } = this.state;
    console.log(token);
    return onCreate(donation, token);
    // return apiCall(
    //   'post',
    //   donation.recurrence === 'month'
    //     ? `/campaigns/${donationCampaign.id}/subscriptions`
    //     : `/campaigns/${donationCampaign.id}/donations`,
    //   {
    //     stripeToken: token.id,
    //     card: token.card,
    //     donation,
    //   },
    // )
    //   .then(response => {
    //     this.setState(
    //       {
    //         donation: response.data,
    //         paymentFormSubmitted: true,
    //         paymentFormError: null,
    //       },
    //       () => this.slider.next(),
    //     );
    //   })
    //   .catch(error => {
    //     this.setState({
    //       paymentFormSubmitted: true,
    //       paymentFormError: error.response.data.error.message,
    //     });
    //   });
  };

  render() {
    const {
      currentMember,
      currentOrganization,
      donationCampaign,
      providers,
    } = this.props;
    const { donation, activeSlide } = this.state;

    const slides = [
      {
        key: 'donation',
        header: {
          itemBefore: (
            <div className="navbar-header d-md-none">
              <a className="navbar-brand d-flex align-items-center">
                <X />
              </a>
            </div>
          ),
          name: 'Dona ora',
        },
        component: (
          <Donation
            {...this.props}
            submitted
            onSave={newDonation => {
              this.setState(
                {
                  ...newDonation,
                },
                () =>
                  setTimeout(() => (this.slider.current as any).next(), 500),
              );
            }}
          />
        ),
      },
    ];

    if (providers.length > 1) {
      slides.push({
        key: 'pay-with',
        header: {
          itemBefore: (
            <div className="navbar-header" key="payment-header">
              <a
                href="#"
                className="navbar-brand d-flex align-items-center"
                onClick={e => {
                  e.preventDefault();
                  (this.slider.current as any).prev();
                }}
              >
                <ArrowLeft />
              </a>
            </div>
          ),
          name: 'Metodo di pagamento',
        },
        component: (
          <div className="p-3 p-xl-4">
            {donation.amount && (
              <Payments
                scope="donations"
                amount={donation.amount}
                apiKey="pk_test_gxaXiVZYxYA1u1ZzqjVr71c5"
                onPaymentIntentSuccess={this.createDonation}
              >
                {paymentProps => (
                  <PayWith
                    {...paymentProps}
                    label="Donazione"
                    onChange={provider =>
                      this.setState({ provider }, () =>
                        (this.slider.current as any).next(),
                      )
                    }
                  ></PayWith>
                )}
              </Payments>
            )}
          </div>
        ),
      });
    }

    slides.push({
      key: 'pay',
      header: {
        itemBefore: (
          <div className="navbar-header" key="payment-header">
            <a
              href="#"
              className="navbar-brand d-flex align-items-center"
              onClick={e => {
                e.preventDefault();
                (this.slider.current as any).prev();
              }}
            >
              <ArrowLeft />
            </a>
          </div>
        ),
        name: 'Pagamento',
      },
      component: (
        <div className="p-3 p-xl-4">
          {donation.amount && (
            <Payments
              scope="donations"
              amount={donation.amount}
              apiKey="pk_test_gxaXiVZYxYA1u1ZzqjVr71c5"
              onPaymentIntentSuccess={paymentIntent => {
                console.log(paymentIntent);
                (this.slider.current as any).next();
              }}
              provider={this.state.provider}
            >
              {paymentProps => (
                <Pay {...paymentProps} providerProps={{ hidePostalCode: true }}>
                  <div className="card card-body mb-3 p-3">
                    <dl className="mb-0">
                      <dt className="d-flex align-items-center justify-content-between">
                        Donazione
                        {donation.recurrence === 'month' && (
                          <span className="badge badge-secondary p-1 px-3">
                            ogni mese
                          </span>
                        )}
                      </dt>
                      <dd className="mb-0 text-muted">
                        Stai per donare {donation.amount / 100} € a{' '}
                        <span className="text-medium">
                          {currentOrganization.name}
                        </span>{' '}
                        per il progetto{' '}
                        <span className="text-medium">
                          {donationCampaign.name}
                        </span>
                      </dd>
                    </dl>
                  </div>
                  {currentMember && (
                    <div className="card card-body mb-3 p-3">
                      <dl className="mb-0">
                        <dt>Contatto</dt>
                        <dd className="mb-0 text-muted">
                          <address className="mb-0">
                            <span className="text-medium">
                              Stai donando come {currentMember.name}
                            </span>
                            <br />
                            {currentMember.email}
                          </address>
                        </dd>
                      </dl>
                    </div>
                  )}
                </Pay>
              )}
            </Payments>
          )}
        </div>
      ),
    });

    slides.push({
      key: 'preferences',
      header: {
        itemBefore: (
          <div className="navbar-header" key="preferences-header">
            <a
              href="#"
              className="navbar-brand d-flex align-items-center"
              onClick={e => {
                window.alert('esci');
              }}
            >
              <X />
            </a>
          </div>
        ),
        name: 'Personalizza',
      },
      component: (
        <div>
          <div className="p-3 p-xl-4 bg-donations">
            <div className="media align-items-center">
              {/* <AnimatedCheck
                  className="mr-3 text-white"
                  style={{ width: '28px' }}
                /> */}
              <div className="media-body">
                <p className="mb-0 text-white text-medium">
                  Donazione effettuata con successo
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 p-xl-4">
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a className="card mb-3" href={donation.receiptPath}>
              <div className="media align-items-stretch">
                <div className="d-flex align-items-center py-2 px-3 bg-light">
                  <div
                    className="file-icon file-icon-xs d-flex mx-1 flex-shrink-0"
                    data-type="pdf"
                    style={{
                      width: '11px',
                      height: '16px',
                      verticalAlign: 'sub',
                    }}
                  />
                </div>
                <div className="media-body text-medium py-2 px-3">
                  Scarica la ricevuta
                </div>
              </div>
            </a>
            <a className="card" href={donation.receiptPath}>
              <div className="media align-items-stretch">
                <div className="d-flex align-items-center py-2 px-3 bg-light">
                  <div
                    className="file-icon file-icon-xs d-flex mx-1 flex-shrink-0"
                    data-type="pdf"
                    style={{
                      width: '11px',
                      height: '16px',
                      verticalAlign: 'sub',
                    }}
                  />
                </div>
                <div className="media-body text-medium py-2 px-3">
                  Condividi sui social
                </div>
              </div>
            </a>
          </div>
          <hr />

          <div className="p-3 p-xl-4">
            {donation.subscription ? (
              <p>Registrati</p>
            ) : (
              <DonationPreferences
                {...this.props}
                // submitted={loadingSection !== 'contact'}
                donation={donation}
                onSave={newContact => {
                  this.setState({
                    contact: newContact,
                  });
                }}
              />
            )}
          </div>
        </div>
      ),
    });

    return (
      <Shell slides={slides} ref={this.slider} currentMember={currentMember} />
    );
  }
}
