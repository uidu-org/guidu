import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Address from './Address';

export default ({ onSave, stripeAccount }) => (
  <Form
    handleSubmit={async (model) => onSave(model)}
    autoComplete="off"
    footerRenderer={({ loading, canSubmit }) => (
      <FormSubmit
        label={<FormattedMessage defaultMessage="Next" />}
        canSubmit={canSubmit}
        loading={loading}
      />
    )}
  >
    <FieldText
      type="email"
      label={<FormattedMessage defaultMessage="Primary business email" />}
      value={stripeAccount.business_email || ''}
      name="stripe_account[business_email]"
      required
    />
    <FieldText
      type="text"
      label={<FormattedMessage defaultMessage="Organization name" />}
      name="stripe_account[business_name]"
      value={stripeAccount.business_name || ''}
      required
    />
    <FieldText
      type="text"
      label={<FormattedMessage defaultMessage="Organization fiscal code" />}
      name="stripe_account[business_fiscal_code]"
      value={stripeAccount.business_fiscal_code || ''}
      required
    />
    <FieldText
      type="text"
      label={<FormattedMessage defaultMessage="Organization VAT code" />}
      name="stripe_account[business_vat_code]"
      value={stripeAccount.business_vat_code || ''}
    />
    <Address scope="business" stripeAccount={stripeAccount} />
  </Form>
);
