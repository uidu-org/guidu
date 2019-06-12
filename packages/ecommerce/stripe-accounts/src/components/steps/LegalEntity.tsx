import FieldText from '@uidu/field-text';
import { Form } from '@uidu/form';
import moment from 'moment';
import React from 'react';

export default function LegalEntity({ handleSubmit }) {
  return (
    <Form
      onValidSubmit={handleSubmit}
      autoComplete="off"
      footerRenderer={({}) => <button>Invia</button>}
    >
      <div className="row stretched">
        <div className="col-sm-6">
          <FieldText
            type="text"
            label="activerecord.attributes.stripe_account.legal_entity_owner_first_name"
            name="stripe_account[legal_entity_owner_first_name]"
            required
          />
        </div>
        <div className="col-sm-6">
          <FieldText
            type="text"
            label="activerecord.attributes.stripe_account.legal_entity_owner_last_name"
            name="stripe_account[legal_entity_owner_last_name]"
            required
          />
        </div>
      </div>
      <div className="row stretched">
        <div className="col-sm-8">
          <FieldText
            type="text"
            label="activerecord.attributes.stripe_account.legal_entity_owner_address"
            name="stripe_account[legal_entity_owner_address]"
            required
          />
        </div>
        <div className="col-sm-4">
          <FieldText
            type="text"
            label="activerecord.attributes.stripe_account.legal_entity_owner_postal_code"
            name="stripe_account[legal_entity_owner_postal_code]"
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
            label="activerecord.attributes.stripe_account.legal_entity_owner_city"
            name="stripe_account[legal_entity_owner_city]"
            required
          />
        </div>
        <div className="col-sm-4">
          <FieldText
            type="text"
            label="activerecord.attributes.stripe_account.legal_entity_owner_state"
            name="stripe_account[legal_entity_owner_state]"
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
            label="activerecord.attributes.stripe_account.legal_entity_owner_country"
            name="stripe_account[legal_entity_owner_country]"
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
        label="activerecord.attributes.stripe_account.legal_entity_owner_birthdate"
        name="stripe_account[legal_entity_owner_birthdate]"
        mask="99/99/9999"
        help={`GG/MM/AAAA - Es: ${moment().format('DD/MM/YYYY')}`}
        required
      />
      <FieldText
        type="text"
        label="activerecord.attributes.stripe_account.legal_entity_owner_personal_id"
        name="stripe_account[legal_entity_owner_personal_id]"
        required
      />
      {/* <FileInput
        label={window.I18n.t(
          'activerecord.attributes.stripe_account.legal_entity_owner_document',
        )}
        name="stripe_account[legal_entity_owner_document]"
        value={undefined}
        help={window.I18n.t(
          'activerecord.hints.stripe_account.legal_entity_owner_document',
        )}
        accept="image/png, image/jpeg"
        required
      /> */}
    </Form>
  );
}
