import React from 'react';
import moment from 'moment';
import Formsy from 'formsy-react';

export default function StripeAccountActivationLegalEntity({ handleSubmit }) {
  return (
    <Formsy.Form onValidSubmit={handleSubmit} autoComplete="off">
      <div className="row stretched">
        <div className="col-sm-6">
          <Input
            type="text"
            label={window.I18n.t(
              'activerecord.attributes.stripe_account.legal_entity_owner_first_name',
            )}
            name="stripe_account[legal_entity_owner_first_name]"
            value={window.Uidu.current_user.first_name}
            required
          />
        </div>
        <div className="col-sm-6">
          <Input
            type="text"
            label={window.I18n.t(
              'activerecord.attributes.stripe_account.legal_entity_owner_last_name',
            )}
            name="stripe_account[legal_entity_owner_last_name]"
            value={window.Uidu.current_user.last_name}
            required
          />
        </div>
      </div>
      <div className="row stretched">
        <div className="col-sm-8">
          <Input
            type="text"
            label={window.I18n.t(
              'activerecord.attributes.stripe_account.legal_entity_owner_address',
            )}
            name="stripe_account[legal_entity_owner_address]"
            value={window.Uidu.current_user.location.street_address}
            required
          />
        </div>
        <div className="col-sm-4">
          <Input
            type="text"
            label={window.I18n.t(
              'activerecord.attributes.stripe_account.legal_entity_owner_postal_code',
            )}
            name="stripe_account[legal_entity_owner_postal_code]"
            value={window.Uidu.current_user.location.postal_code}
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
          <Input
            type="text"
            label={window.I18n.t(
              'activerecord.attributes.stripe_account.legal_entity_owner_city',
            )}
            name="stripe_account[legal_entity_owner_city]"
            value={window.Uidu.current_user.location.city}
            required
          />
        </div>
        <div className="col-sm-4">
          <Input
            type="text"
            label={window.I18n.t(
              'activerecord.attributes.stripe_account.legal_entity_owner_state',
            )}
            name="stripe_account[legal_entity_owner_state]"
            value={
              window.Uidu.current_user.location.state &&
              window.Uidu.current_user.location.state.capitalize()
            }
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
          <Input
            type="text"
            label={window.I18n.t(
              'activerecord.attributes.stripe_account.legal_entity_owner_country',
            )}
            name="stripe_account[legal_entity_owner_country]"
            value={
              window.Uidu.current_user.location.country_code
                ? window.Uidu.current_user.location.country_code.capitalize()
                : 'IT'
            }
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
      <Input
        type="text"
        label={window.I18n.t(
          'activerecord.attributes.stripe_account.legal_entity_owner_birthdate',
        )}
        name="stripe_account[legal_entity_owner_birthdate]"
        value={
          window.Uidu.current_user.birthdate &&
          moment(window.Uidu.current_user.birthdate).format('DD/MM/YYYY')
        }
        mask="99/99/9999"
        help={`GG/MM/AAAA - Es: ${moment().format('DD/MM/YYYY')}`}
        required
      />
      <Input
        type="text"
        label={window.I18n.t(
          'activerecord.attributes.stripe_account.legal_entity_owner_personal_id',
        )}
        name="stripe_account[legal_entity_owner_personal_id]"
        required
      />
      <FileInput
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
      />
      <FormHelpers.Actions>
        <FormHelpers.Submit label={window.I18n.t('utils.actions.add')} />
      </FormHelpers.Actions>
    </Formsy.Form>
  );
}
