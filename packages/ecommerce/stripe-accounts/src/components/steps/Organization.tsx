import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import moment from 'moment';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ handleSubmit }) => (
  <Form
    handleSubmit={handleSubmit}
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
    />
    <div className="row stretched">
      <div className="col-sm-8">
        <FieldText
          type="text"
          label={
            <FormattedMessage
              id="guidu.stripeAccounts.organization.address"
              defaultMessage="Legal address"
            />
          }
          name="stripe_account[organization_address]"
          required
        />
      </div>
      <div className="col-sm-4">
        <FieldText
          type="text"
          label={
            <FormattedMessage
              id="guidu.stripeAccounts.organization.postalCode"
              defaultMessage="Postal code"
            />
          }
          name="stripe_account[organization_postal_code]"
          required
        />
      </div>
    </div>
    <div className="row stretched">
      <div className="col-sm-4">
        <FieldText
          type="text"
          label={
            <FormattedMessage
              id="guidu.stripeAccounts.organization.city"
              defaultMessage="City"
            />
          }
          name="stripe_account[organization_city]"
          required
        />
      </div>
      <div className="col-sm-4">
        <FieldText
          type="text"
          label={
            <FormattedMessage
              id="guidu.stripeAccounts.organization.state"
              defaultMessage="State"
            />
          }
          name="stripe_account[organization_state]"
          required
        />
      </div>
      <div className="col-sm-4">
        <FieldText
          type="text"
          label={
            <FormattedMessage
              id="guidu.stripeAccounts.organization.country"
              defaultMessage="Country"
            />
          }
          name="stripe_account[organization_country]"
          // autoCapitalize="characters"
          // validations={{
          //   isLength: 2,
          // }}
          // validationErrors={{
          //   isLength: 'Inserisci la sigla dello stato (ES. IT)',
          // }}
          required
        />
      </div>
    </div>
    <FieldText
      type="text"
      label={
        <FormattedMessage
          id="guidu.stripeAccounts.organization.foundingDate"
          defaultMessage="Founding date"
        />
      }
      name="stripe_account[organization_birthdate]"
      mask="99/99/9999"
      help={`GG/MM/AAAA - Es: ${moment().format('DD/MM/YYYY')}`}
      required
    />
  </Form>
);
