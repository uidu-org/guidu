import { IbanElement } from '@stripe/react-stripe-js';
import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import { createIbanElementOptions } from '@uidu/payments';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';

export default class BankAccount extends PureComponent<any> {
  render() {
    const { handleSubmit, error } = this.props;
    return (
      <>
        <style>{`#iban-element { padding-top: 10px; padding-bottom: 10px }`}</style>
        <Form
          handleSubmit={handleSubmit}
          autoComplete="off"
          footerRenderer={({ loading, canSubmit }) => (
            <FormSubmit
              label={
                <FormattedMessage
                  id="guidu.stripeAccounts.Save"
                  defaultMessage="Save"
                />
              }
              canSubmit={canSubmit}
              loading={loading}
            />
          )}
        >
          <div style={{ position: 'relative' }}>
            <div className="form-group">
              <label htmlFor="credit-card">
                <FormattedMessage
                  id="guidu.stripeAccounts.bankAccount.iban"
                  defaultMessage="IBAN"
                />
              </label>
              <IbanElement
                id="iban-element"
                options={createIbanElementOptions({
                  supportedCountries: ['SEPA'],
                })}
              />
            </div>
          </div>
          {error && <div className="alert alert-danger">{error.message}</div>}
          <FieldText
            type="text"
            label={
              <FormattedMessage
                id="guidu.stripeAccounts.bankAccount.holder"
                defaultMessage="Account owner"
              />
            }
            name="stripe_account[bank_account_account_holder_name]"
            required
          />
        </Form>
      </>
    );
  }
}
