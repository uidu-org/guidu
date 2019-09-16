import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Address from './Address';

export default function LegalEntity({ onSave, stripeAccount }) {
  return (
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
      <div className="row stretched">
        <div className="col-sm-6">
          <FieldText
            type="text"
            label={
              <FormattedMessage
                id="guidu.stripeAccounts.legalEntity.firstName"
                defaultMessage="Name"
              />
            }
            name="stripe_account[legal_entity_owner_first_name]"
            value={stripeAccount.legal_entity_owner_first_name || ''}
            required
          />
        </div>
        <div className="col-sm-6">
          <FieldText
            type="text"
            label={
              <FormattedMessage
                id="guidu.stripeAccounts.legalEntity.lastName"
                defaultMessage="Last name"
              />
            }
            name="stripe_account[legal_entity_owner_last_name]"
            value={stripeAccount.legal_entity_owner_last_name || ''}
            required
          />
        </div>
      </div>
      <Address scope="legalEntity" stripeAccount={stripeAccount} />
      <FieldText
        type="text"
        label={
          <FormattedMessage
            id="guidu.stripeAccounts.legalEntity.document"
            defaultMessage="Personal identification document"
          />
        }
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
