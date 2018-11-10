import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import makeAsyncScriptLoader from 'react-async-script';

class StripeAccountActivationBankAccount extends React.Component {
  componentDidUpdate() {
    const { errors } = this.props;
    if (errors && errors.param === 'bank_account') {
      this.form.updateInputsWithError({
        'stripe_account[bank_account_account_number]': errors.message,
      });
    }
  }

  // validateBankAccont(name, value) {
  //   // console.log(name);
  //   // console.log(value);
  //   // console.log(this.props.Stripe.bankAccount.validateAccountNumber(value, 'IT'));
  //   // return this.props.Stripe.bankAccount.validateAccountNumber(value, 'IT');
  // }

  render() {
    const { Stripe, handleSubmit } = this.props;
    return (
      <Loader loaded={is.not.undefined(Stripe)}>
        <Formsy.Form
          ref={c => {
            this.form = c;
          }}
          onValidSubmit={handleSubmit}
        >
          {false && (
            <div>
              <Input
                type="text"
                label={window.I18n.t(
                  'activerecord.attributes.stripe_account.bank_account_country',
                )}
                name="stripe_account[bank_account_country]"
                value="IT"
                required
              />
              <Input
                type="text"
                label={window.I18n.t(
                  'activerecord.attributes.stripe_account.bank_account_currency',
                )}
                name="stripe_account[bank_account_currency]"
                value="EUR"
                required
              />
            </div>
          )}
          <Input
            type="text"
            label={window.I18n.t(
              'activerecord.attributes.stripe_account.bank_account_account_number',
            )}
            name="stripe_account[bank_account_account_number]"
            // validations={{
            //   custom: this.validateBankAccont
            // }}
            // help="IT89370400440532013000"
            required
          />
          <Input
            type="text"
            label="Intestatario"
            name="stripe_account[bank_account_account_holder_name]"
            value={window.Uidu.current_user.name}
            required
          />
          <FormHelpers.Actions>
            <FormHelpers.Submit label={window.I18n.t('utils.actions.add')} />
          </FormHelpers.Actions>
        </Formsy.Form>
      </Loader>
    );
  }
}

StripeAccountActivationBankAccount.defaultProps = {
  Stripe: undefined,
  handleSubmit: () => {},
  errors: undefined,
};

StripeAccountActivationBankAccount.propTypes = {
  Stripe: PropTypes.func,
  handleSubmit: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.object),
};

const URL = 'https://js.stripe.com/v2/';
const globalName = 'Stripe';

export default makeAsyncScriptLoader(StripeAccountActivationBankAccount, URL, {
  globalName,
});
