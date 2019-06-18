import { Shell } from '@uidu/widgets';
// import AnimatedCheck from 'components/AnimatedCheck';
// import ContactForm from 'organization/components/contacts/form';
import React, { Component } from 'react';
import { X } from 'react-feather';
import Preferences from './steps/Preferences';
import Reminder from './steps/Reminder';

export default class TaxReminder extends Component<any, any> {
  static defaultProps = {
    providers: ['card'],
  };

  private slider = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      donation: props.donation,
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
    const { currentMember } = this.props;
    const { donation } = this.state;

    const slides = [
      {
        key: 'reminder',
        header: {
          itemBefore: (
            <div className="navbar-header d-md-none">
              <a className="navbar-brand d-flex align-items-center">
                <X />
              </a>
            </div>
          ),
          name: 'Destina il tuo 5x1000',
        },
        component: (
          <Reminder
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
      {
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
            <div className="p-3 p-xl-4 bg-tax-returns">
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
                <Preferences
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
      },
    ];

    return (
      <Shell slides={slides} currentMember={currentMember} ref={this.slider} />
    );
  }
}
