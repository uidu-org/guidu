import Stepper, { Step } from '@uidu/stepper';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Elements, injectStripe, StripeProvider } from 'react-stripe-elements';
import BankAccount from './steps/BankAccount';
import LegalEntity from './steps/LegalEntity';
import Organization from './steps/Organization';

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
    this.save(model, false);
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
      <Stepper defaultStep="info" scrollElement={scrollElement}>
        {({ getStepProps, jumpToStep }) => (
          <>
            <Step
              {...getStepProps()}
              name="info"
              label={
                <FormattedMessage
                  id="guidu.stripeAccounts.organization.title"
                  defaultMessage="Organization's data"
                />
              }
              scope="teams"
              number={1}
            >
              <Organization
                stripeAccount={stripeAccount}
                onSave={newStripeAccount =>
                  this.updateStripeAccount(newStripeAccount, () => {
                    jumpToStep('legal');
                  })
                }
              />
            </Step>
            <Step
              {...getStepProps()}
              name="legal"
              label={
                <FormattedMessage
                  id="guidu.stripeAccounts.legalEntity.title"
                  defaultMessage="Legal entity"
                />
              }
              scope="teams"
              number={2}
            >
              <LegalEntity
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
                  id="guidu.stripeAccounts.bankAccount.title"
                  defaultMessage="Bank Account"
                />
              }
              scope="teams"
              number={3}
            >
              <BankAccount error={error} handleSubmit={this.handleSubmit} />
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
