import Loader from '@uidu/loader';
import Slider from '@uidu/slider';
import Stepper, { Step } from '@uidu/stepper';
import classNames from 'classnames';
import React, { Fragment, PureComponent } from 'react';
import { Elements, injectStripe, StripeProvider } from 'react-stripe-elements';
import BankAccount from './steps/BankAccount';
import LegalEntity from './steps/LegalEntity';
import Organization from './steps/Organization';
import Status from './steps/Status';

class StripeAccounts extends PureComponent<any, any> {
  static defaultProps = {
    stripeAccount: {},
  };

  private slider = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      stripeAccount: props.stripeAccount,
      submitting: false,
      error: null,
      currentSlide: 0,
    };
  }

  cleanDate = date => {
    const comps = date.split('/');
    return `${comps[2]}-${comps[1]}-${comps[0]}`;
  };

  handleSubmit = model => {
    this.save(model, false);
    this.submitting(true);
    (this.slider.current as any).next();
    const { stripe } = this.props;
    const {
      bank_account_routing_number,
      bank_account_account_number,
      bank_account_account_holder_name,
      bank_account_account_holder_type,
    } = model.stripe_account;
    stripe
      .createToken('bank_account', {
        country: 'DE',
        currency: 'EUR',
        routing_number: bank_account_routing_number,
        account_number: bank_account_account_number,
        account_holder_name: bank_account_account_holder_name,
        account_holder_type: bank_account_account_holder_type,
      })
      .then(this.stripeResponseHandler);
  };

  stripeResponseHandler = response => {
    const { stripeAccount } = this.state;
    if (response.error) {
      this.setState(
        {
          error: response.error,
        },
        () => {
          (this.slider.current as any).prev();
        },
      );
    } else {
      const formData = new FormData();
      // Organization data
      formData.append(
        'stripe_account[organization_email]',
        stripeAccount.organization_email,
      );
      formData.append(
        'stripe_account[organization_name]',
        stripeAccount.organization_name,
      );
      formData.append(
        'stripe_account[organization_fiscal_code]',
        stripeAccount.organization_fiscal_code,
      );
      formData.append(
        'stripe_account[organization_vat_code]',
        stripeAccount.organization_vat_code,
      );
      formData.append(
        'stripe_account[organization_address]',
        stripeAccount.organization_address,
      );
      formData.append(
        'stripe_account[organization_postal_code]',
        stripeAccount.organization_postal_code,
      );
      formData.append(
        'stripe_account[organization_city]',
        stripeAccount.organization_city,
      );
      formData.append(
        'stripe_account[organization_state]',
        stripeAccount.organization_state,
      );
      formData.append(
        'stripe_account[organization_country]',
        stripeAccount.organization_country,
      );
      formData.append(
        'stripe_account[organization_birthdate]',
        this.cleanDate(stripeAccount.organization_birthdate),
      );

      // Legal entity data
      formData.append(
        'stripe_account[legal_entity_owner_first_name]',
        stripeAccount.legal_entity_owner_first_name,
      );
      formData.append(
        'stripe_account[legal_entity_owner_last_name]',
        stripeAccount.legal_entity_owner_last_name,
      );
      formData.append(
        'stripe_account[legal_entity_owner_address]',
        stripeAccount.legal_entity_owner_address,
      );
      formData.append(
        'stripe_account[legal_entity_owner_postal_code]',
        stripeAccount.legal_entity_owner_postal_code,
      );
      formData.append(
        'stripe_account[legal_entity_owner_city]',
        stripeAccount.legal_entity_owner_city,
      );
      formData.append(
        'stripe_account[legal_entity_owner_state]',
        stripeAccount.legal_entity_owner_state,
      );
      formData.append(
        'stripe_account[legal_entity_owner_country]',
        stripeAccount.legal_entity_owner_country,
      );
      formData.append(
        'stripe_account[legal_entity_owner_birthdate]',
        this.cleanDate(stripeAccount.legal_entity_owner_birthdate),
      );
      formData.append(
        'stripe_account[legal_entity_owner_personal_id]',
        stripeAccount.legal_entity_owner_personal_id,
      );
      formData.append(
        'stripe_account[legal_entity_owner_document]',
        stripeAccount.legal_entity_owner_document[0],
        stripeAccount.legal_entity_owner_document[0].name,
      );

      // Bank Account data
      formData.append('stripe_account[bank_account_id]', response.token.id);
      formData.append(
        'stripe_account[bank_account_country]',
        stripeAccount.bank_account_country,
      );
      formData.append(
        'stripe_account[bank_account_country]',
        stripeAccount.bank_account_country,
      );
      formData.append(
        'stripe_account[bank_account_currency]',
        stripeAccount.bank_account_currency,
      );
      formData.append(
        'stripe_account[bank_account_account_number]',
        stripeAccount.bank_account_account_number,
      );
      formData.append(
        'stripe_account[bank_account_account_holder_name]',
        stripeAccount.bank_account_account_holder_name,
      );

      // window.$.ajax({
      //   url: '/accounts',
      //   type: 'POST',
      //   xhrFields: { withCredentials: true },
      //   crossDomain: true,
      //   contentType: false,
      //   processData: false,
      //   data: formData,
      //   context: this,
      //   success(savedStripeAccount) {
      //     this.setState(
      //       {
      //         stripeAccount: savedStripeAccount,
      //       },
      //       () => {
      //         this.next();
      //       },
      //     );
      //   },
      //   error() {
      //     this.prev();
      //   },
      // });
    }
  };

  submitting = submitting => {
    this.setState({
      submitting,
    });
  };

  save = async (model, next = true) => {
    const { stripeAccount } = this.state;
    await this.setState(
      {
        stripeAccount: {
          ...stripeAccount,
          ...model.stripe_account,
        },
      },
      () => {
        if (next) {
          (this.slider.current as any).next();
        }
      },
    );
  };

  slideCallback = () => {
    const swiper = (this.slider.current as any).mySlider;
    if (!swiper) return;
    this.setState({
      currentSlide: swiper.activeIndex,
    });
  };

  render() {
    const { submitting, error, stripeAccount, currentSlide } = this.state;

    return (
      <Stepper defaultStep="info">
        {({ getStepProps, jumpToStep }) => (
          <Fragment>
            <Step
              {...getStepProps()}
              name="info"
              label="Dati organizzazione"
              scope="teams"
              number={1}
            >
              <Organization
                handleSubmit={async model =>
                  this.save(model).then(jumpToStep('legal'))
                }
              />
            </Step>
            <Step
              {...getStepProps()}
              name="legal"
              label="Legale rappresentante"
              scope="teams"
              number={2}
            >
              <LegalEntity handleSubmit={this.save} />
            </Step>
            <Step
              {...getStepProps()}
              name="bank"
              label="Conto corrente"
              scope="teams"
              number={3}
            >
              <BankAccount
                submitting={submitting}
                error={error}
                handleSubmit={this.handleSubmit}
              />
            </Step>
          </Fragment>
        )}
      </Stepper>
    );

    return (
      <div className="container container-spaced">
        <div className="row">
          <div className="col-sm-9">
            <div className="card-body">
              {(!stripeAccount || !stripeAccount.status) && (
                <ul
                  className="nav nav-tabs nav-justified nav-progress"
                  role="tablist"
                >
                  <li
                    role="presentation"
                    className={classNames({
                      active: currentSlide === 0,
                    })}
                  >
                    <a>
                      <b>1</b> -
                    </a>
                  </li>
                  <li
                    role="presentation"
                    className={classNames({
                      active: currentSlide === 1,
                    })}
                  >
                    <a>
                      <b>2</b> - Legale rappresentante
                    </a>
                  </li>
                  <li
                    role="presentation"
                    className={classNames({
                      active: currentSlide === 2,
                    })}
                  >
                    <a>
                      <b>3</b> - Conto corrente
                    </a>
                  </li>
                </ul>
              )}
              <div className="card-body">
                <Slider
                  ref={this.slider}
                  options={{
                    spaceBetween: 0,
                    // allowTouchMove: false,
                    initialSlide: stripeAccount && stripeAccount.status ? 4 : 0,
                    on: {
                      slideChangeTransitionEnd: this.slideCallback,
                    },
                  }}
                  slideClassName="swiper-slide-full-width"
                >
                  <Organization handleSubmit={this.save} />
                  <LegalEntity handleSubmit={this.save} />
                  <BankAccount
                    submitting={submitting}
                    error={error}
                    handleSubmit={this.handleSubmit}
                  />
                  <Loader loaded={!submitting} />
                  <Status stripeAccount={stripeAccount} />
                </Slider>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <img
              className="mb-4"
              src={this.props.poweredByStripe}
              alt="Powered by Stripe"
            />
            <h4>Istruzioni</h4>
            <p
            // dangerouslySetInnerHTML={{
            //   __html: window.I18n.t('account_activation.instructions')[
            //     currentSlide
            //   ],
            // }}
            >
              account_activation.instructions
            </p>
            {currentSlide === 0 && (
              <div>
                <br />
                <h4>Hai già un account Stripe?</h4>
                <p>
                  Connetti gli account per gestire con uidu le donazioni e
                  visualizzare su Stripe tutte le tue transazioni
                </p>
                <a
                  href={`/auth/stripe_connect?redirect_to=${this.props.redirectTo}`}
                  className="btn btn-block"
                >
                  Stripe Connect
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const StripeStripeAccounts = injectStripe(StripeAccounts);

export default props => (
  <StripeProvider apiKey="pk_test_gxaXiVZYxYA1u1ZzqjVr71c5">
    <Elements>
      <StripeStripeAccounts {...props} />
    </Elements>
  </StripeProvider>
);
