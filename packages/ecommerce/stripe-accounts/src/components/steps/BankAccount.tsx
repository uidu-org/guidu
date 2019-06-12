import FieldText from '@uidu/field-text';
import { Form } from '@uidu/form';
import React, { PureComponent } from 'react';

export default class BankAccount extends PureComponent<any> {
  render() {
    const { handleSubmit, error } = this.props;
    return (
      <Form
        handleSubmit={handleSubmit}
        footerRenderer={({}) => <button>Invia</button>}
      >
        {/* <FieldText
          type="text"
          label="activerecord.attributes.stripe_account.bank_account_country"
          name="stripe_account[bank_account_country]"
          value="IT"
          required
        />
        <FieldText
          type="text"
          label={
            'activerecord.attributes.stripe_account.bank_account_currency'
          }
          name="stripe_account[bank_account_currency]"
          value="EUR"
          required
        /> */}
        {error && <div className="alert alert-danger">{error.message}</div>}
        <FieldText
          type="text"
          label={
            'activerecord.attributes.stripe_account.bank_account_account_number'
          }
          name="stripe_account[bank_account_account_number]"
          // validations={{
          //   custom: this.validateBankAccont
          // }}
          // help="IT89370400440532013000"
          required
        />
        <FieldText
          type="text"
          label="Intestatario"
          name="stripe_account[bank_account_account_holder_name]"
          required
        />
      </Form>
    );
  }
}
