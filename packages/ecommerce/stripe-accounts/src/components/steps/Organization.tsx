import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Address from './Address';

export default ({ onSave, stripeAccount }) => (
  <Form
    handleSubmit={async model => onSave(model)}
    autoComplete="off"
    footerRenderer={({ loading, canSubmit }) => (
      <FormSubmit
        label={
          <FormattedMessage
            id="guidu.stripeAccounts.next"
            defaultMessage="Next"
          />
        }
        canSubmit={canSubmit}
        loading={loading}
      />
    )}
  >
    <FieldText
      type="email"
      label={
        <FormattedMessage
          id="guidu.stripeAccounts.organization.email"
          defaultMessage="Primary organization email"
        />
      }
      value={stripeAccount.organization_email || ''}
      name="stripe_account[organization_email]"
      required
    />
    <FieldText
      type="text"
      label={
        <FormattedMessage
          id="guidu.stripeAccounts.organization.name"
          defaultMessage="Organization name"
        />
      }
      name="stripe_account[organization_name]"
      value={stripeAccount.organization_name || ''}
      required
    />
    <FieldText
      type="text"
      label={
        <FormattedMessage
          id="guidu.stripeAccounts.organization.fiscalCode"
          defaultMessage="Organization fiscal code"
        />
      }
      name="stripe_account[organization_fiscal_code]"
      value={stripeAccount.organization_fiscal_code || ''}
      required
    />
    <FieldText
      type="text"
      label={
        <FormattedMessage
          id="guidu.stripeAccounts.organization.vatCode"
          defaultMessage="Organization VAT code"
        />
      }
      name="stripe_account[organization_vat_code]"
      value={stripeAccount.organization_vat_code || ''}
    />
    <Address scope="organization" stripeAccount={stripeAccount} />
  </Form>
);
