import Contact from '@uidu/contact';
import Payments, { Pay, PayWith } from '@uidu/payments';
import { ShellHeader } from '@uidu/shell';
import Slider from '@uidu/slider';
// import AnimatedCheck from 'components/AnimatedCheck';
// import ContactForm from 'organization/components/contacts/form';
import React, { Component, Fragment } from 'react';
import { ArrowLeft, Circle, X } from 'react-feather';
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
        navbar: [
          <div className="navbar-header d-md-none" key="donation-header">
            <a className="navbar-brand d-flex align-items-center">
              <X />
            </a>
          </div>,
          <div className="navbar-title text-md-left" key="donation-title">
            <span className="navbar-brand m-0">Dona ora</span>
          </div>,
        ],
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
        navbar: [
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
          </div>,
          <div className="navbar-title" key="payment-title">
            <span className="navbar-brand m-0">Pagamento</span>
          </div>,
        ],
        component: (
          <div className="p-4">
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
      navbar: [
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
        </div>,
        <div className="navbar-title" key="payment-title">
          <span className="navbar-brand m-0">Pagamento</span>
        </div>,
      ],
      component: (
        <div className="p-4">
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
            /*
              <Elements>
                <PaymentForm
                  {...this.props}
                  onSave={this.createDonation}
                  paymentFormError={paymentFormError}
                  paymentFormSubmitted={paymentFormSubmitted}
                  scope="donations"
                  product={{
                    name: 'Donazione',
                    grossPrice: donation && donation.amount,
                  }}
                >
                </PaymentForm>
                </Elements>
              */
          )}
        </div>
      ),
    });

    slides.push({
      key: 'preferences',
      navbar: [
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
        </div>,
        <div className="navbar-title" key="preferences-title">
          <span className="navbar-brand m-0">Personalizza</span>
        </div>,
      ],
      component: (
        <div>
          <div className="p-4 bg-donations">
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
          <div className="p-4">
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

          <div className="p-4">
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

    if (!currentMember) {
      slides.splice(1, 0, {
        key: 'contact',
        navbar: [
          <div className="navbar-header" key="contact-header">
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
          </div>,
          <div className="navbar-title" key="contact-title">
            <span className="navbar-brand m-0">Contatto</span>
          </div>,
        ],
        component: (
          <div className="p-4">
            <Contact
              {...this.props}
              submitted
              scope="donations"
              contact={currentMember}
              onSave={() =>
                setTimeout(() => (this.slider.current as any).next(), 500)
              }
            />
          </div>
        ),
      });
    }

    return (
      <Fragment>
        <ShellHeader className="border-bottom">
          <div className="container-fluid px-1 flex-nowrap d-flex justify-content-between">
            {slides[activeSlide].navbar}
            <div className="navbar-actions" id="navbar-actions">
              <ul className="list-inline d-flex align-items-center justify-content-end mb-0 flex-nowrap">
                {slides.map((slide, index) => (
                  <li className="nav-item" key={slide.key}>
                    <a className="nav-link px-1">
                      {index === activeSlide ? (
                        <Circle size={10} fill="#26a69a" stroke="#26a69a" />
                      ) : (
                        <Circle size={10} fill="#f1f3f5" stroke="#f1f3f5" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ShellHeader>
        <Slider
          options={{
            slidesPerView: 1,
            // allowTouchMove: false,
            on: {
              slideChange: () =>
                this.setState({
                  activeSlide: (this.slider.current as any).mySlider
                    .activeIndex,
                }),
            },
          }}
          ref={this.slider}
        >
          {slides.map(slide => slide.component)}
        </Slider>
      </Fragment>
    );
  }
}
