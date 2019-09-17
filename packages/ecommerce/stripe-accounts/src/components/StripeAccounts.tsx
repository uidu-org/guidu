// https://stripe.com/docs/connect/required-verification-information

import Stepper, { Step } from '@uidu/stepper';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Elements, injectStripe, StripeProvider } from 'react-stripe-elements';
import Business from './steps/Business';
import ExternalAccount from './steps/ExternalAccount';
import Individual from './steps/Individual';

class StripeAccounts extends PureComponent<any, any> {
  static defaultProps = {
    stripeAccount: {},
  };

  private slider = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      stripeAccount: props.stripeAccount,
      error: null,
      currentSlide: 0,
    };
  }

  cleanDate = date => {
    const comps = date.split('/');
    return `${comps[2]}-${comps[1]}-${comps[0]}`;
  };

  handleSubmit = model => {
    this.updateStripeAccount(model, false);
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
        'stripe_account[business_email]',
        stripeAccount.business_email,
      );
      formData.append(
        'stripe_account[business_name]',
        stripeAccount.business_name,
      );
      formData.append(
        'stripe_account[business_fiscal_code]',
        stripeAccount.business_fiscal_code,
      );
      formData.append(
        'stripe_account[business_vat_code]',
        stripeAccount.business_vat_code,
      );
      formData.append(
        'stripe_account[business_address]',
        stripeAccount.business_address,
      );
      formData.append(
        'stripe_account[business_postal_code]',
        stripeAccount.business_postal_code,
      );
      formData.append(
        'stripe_account[business_city]',
        stripeAccount.business_city,
      );
      formData.append(
        'stripe_account[business_state]',
        stripeAccount.business_state,
      );
      formData.append(
        'stripe_account[business_country]',
        stripeAccount.business_country,
      );
      formData.append(
        'stripe_account[business_birthdate]',
        this.cleanDate(stripeAccount.business_birthdate),
      );

      // Legal entity data
      formData.append(
        'stripe_account[individual_first_name]',
        stripeAccount.individual_first_name,
      );
      formData.append(
        'stripe_account[individual_last_name]',
        stripeAccount.individual_last_name,
      );
      formData.append(
        'stripe_account[individual_address]',
        stripeAccount.individual_address,
      );
      formData.append(
        'stripe_account[individual_postal_code]',
        stripeAccount.individual_postal_code,
      );
      formData.append(
        'stripe_account[individual_city]',
        stripeAccount.individual_city,
      );
      formData.append(
        'stripe_account[individual_state]',
        stripeAccount.individual_state,
      );
      formData.append(
        'stripe_account[individual_country]',
        stripeAccount.individual_country,
      );
      formData.append(
        'stripe_account[individual_birthdate]',
        this.cleanDate(stripeAccount.individual_birthdate),
      );
      formData.append(
        'stripe_account[individual_personal_id]',
        stripeAccount.individual_personal_id,
      );
      formData.append(
        'stripe_account[individual_document]',
        stripeAccount.individual_document[0],
        stripeAccount.individual_document[0].name,
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

  updateStripeAccount = (model, callback) => {
    this.setState(
      prevState => ({
        stripeAccount: {
          ...prevState.stripeAccount,
          ...model.stripe_account,
        },
      }),
      callback,
    );
  };

  render() {
    const { scrollElement } = this.props;
    const { error, stripeAccount } = this.state;

    console.log(this.state);

    return (
      <Stepper defaultStep="business" scrollElement={scrollElement}>
        {({ getStepProps, jumpToStep }) => (
          <>
            <Step
              {...getStepProps()}
              name="business"
              label={
                <FormattedMessage
                  id="guidu.stripeAccounts.business.title"
                  defaultMessage="Business's data"
                />
              }
              scope="teams"
              number={1}
            >
              <Business
                stripeAccount={stripeAccount}
                onSave={newStripeAccount =>
                  this.updateStripeAccount(newStripeAccount, () => {
                    jumpToStep('individual');
                  })
                }
              />
            </Step>
            <Step
              {...getStepProps()}
              name="individual"
              label={
                <FormattedMessage
                  id="guidu.stripeAccounts.individual.title"
                  defaultMessage="Individual"
                />
              }
              scope="teams"
              number={2}
            >
              <Individual
                stripeAccount={stripeAccount}
                onSave={newStripeAccount =>
                  this.updateStripeAccount(newStripeAccount, () => {
                    jumpToStep('bank');
                  })
                }
              />
            </Step>
            <Step
              {...getStepProps()}
              name="bank"
              label={
                <FormattedMessage
                  id="guidu.stripeAccounts.externalAccount.title"
                  defaultMessage="Bank Account"
                />
              }
              scope="teams"
              number={3}
            >
              <ExternalAccount error={error} handleSubmit={this.handleSubmit} />
            </Step>
          </>
        )}
      </Stepper>
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
