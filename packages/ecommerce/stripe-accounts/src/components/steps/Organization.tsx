import FieldText from '@uidu/field-text';
import { Form } from '@uidu/form';
import moment from 'moment';
import React from 'react';

export default ({ handleSubmit }) => (
  <Form
    handleSubmit={handleSubmit}
    autoComplete="off"
    footerRenderer={({}) => <button>Invia</button>}
  >
    <FieldText
      type="email"
      label="activerecord.attributes.stripe_account.organization_email"
      name="stripe_account[organization_email]"
      required
    />
    <FieldText
      type="text"
      label="activerecord.attributes.stripe_account.organization_name"
      name="stripe_account[organization_name]"
      required
    />
    <FieldText
      type="text"
      label="activerecord.attributes.stripe_account.organization_fiscal_code"
      name="stripe_account[organization_fiscal_code]"
      required
    />
    <FieldText
      type="text"
      label="activerecord.attributes.stripe_account.organization_vat_code"
      name="stripe_account[organization_vat_code]"
    />
    <div className="row stretched">
      <div className="col-sm-8">
        <FieldText
          type="text"
          label="activerecord.attributes.stripe_account.organization_address"
          name="stripe_account[organization_address]"
          required
        />
      </div>
      <div className="col-sm-4">
        <FieldText
          type="text"
          label="activerecord.attributes.stripe_account.organization_postal_code"
          name="stripe_account[organization_postal_code]"
          validations={{
            isLength: 5,
          }}
          validationErrors={{
            isLength: 'Inserisci un CAP valido',
          }}
          required
        />
      </div>
    </div>
    <div className="row stretched">
      <div className="col-sm-4">
        <FieldText
          type="text"
          label="activerecord.attributes.stripe_account.organization_city"
          name="stripe_account[organization_city]"
          required
        />
      </div>
      <div className="col-sm-4">
        <FieldText
          type="text"
          label="activerecord.attributes.stripe_account.organization_state"
          name="stripe_account[organization_state]"
          validations={{
            isLength: 2,
          }}
          validationErrors={{
            isLength: 'Inserisci la sigla della tua provincia (ES. MI)',
          }}
          required
        />
      </div>
      <div className="col-sm-4">
        <FieldText
          type="text"
          label="activerecord.attributes.stripe_account.organization_country"
          name="stripe_account[organization_country]"
          autoCapitalize="characters"
          validations={{
            isLength: 2,
          }}
          validationErrors={{
            isLength: 'Inserisci la sigla dello stato (ES. IT)',
          }}
          required
        />
      </div>
    </div>
    <FieldText
      type="text"
      label="activerecord.attributes.stripe_account.organization_birthdate"
      name="stripe_account[organization_birthdate]"
      mask="99/99/9999"
      help={`GG/MM/AAAA - Es: ${moment().format('DD/MM/YYYY')}`}
      required
    />
  </Form>
);
