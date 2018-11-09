import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';

const StripeAccountActivationOrganization = ({ handleSubmit }) => (
  <Formsy.Form onValidSubmit={handleSubmit} autoComplete="off">
    <Input
      type="email"
      label={window.I18n.t(
        'activerecord.attributes.stripe_account.organization_email',
      )}
      name="stripe_account[organization_email]"
      value={window.Uidu.current_actor.email}
      required
    />
    <Input
      type="text"
      label={window.I18n.t(
        'activerecord.attributes.stripe_account.organization_name',
      )}
      name="stripe_account[organization_name]"
      value={window.Uidu.current_actor.name}
      required
    />
    <Input
      type="text"
      label={window.I18n.t(
        'activerecord.attributes.stripe_account.organization_fiscal_code',
      )}
      name="stripe_account[organization_fiscal_code]"
      value={window.Uidu.current_actor.fiscal_code}
      required
    />
    <Input
      type="text"
      label={window.I18n.t(
        'activerecord.attributes.stripe_account.organization_vat_code',
      )}
      name="stripe_account[organization_vat_code]"
      value={window.Uidu.current_actor.vat_code}
    />
    <div className="row stretched">
      <div className="col-sm-8">
        <Input
          type="text"
          label={window.I18n.t(
            'activerecord.attributes.stripe_account.organization_address',
          )}
          name="stripe_account[organization_address]"
          value={window.Uidu.current_actor.location.street_address}
          required
        />
      </div>
      <div className="col-sm-4">
        <Input
          type="text"
          label={window.I18n.t(
            'activerecord.attributes.stripe_account.organization_postal_code',
          )}
          name="stripe_account[organization_postal_code]"
          value={window.Uidu.current_actor.location.postal_code}
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
            'activerecord.attributes.stripe_account.organization_city',
          )}
          name="stripe_account[organization_city]"
          value={window.Uidu.current_actor.location.city}
          required
        />
      </div>
      <div className="col-sm-4">
        <Input
          type="text"
          label={window.I18n.t(
            'activerecord.attributes.stripe_account.organization_state',
          )}
          name="stripe_account[organization_state]"
          value={
            window.Uidu.current_actor.location.state &&
            window.Uidu.current_actor.location.state.capitalize()
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
            'activerecord.attributes.stripe_account.organization_country',
          )}
          name="stripe_account[organization_country]"
          value={
            window.Uidu.current_actor.location.country_code
              ? window.Uidu.current_actor.location.country_code.capitalize()
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
        'activerecord.attributes.stripe_account.organization_birthdate',
      )}
      name="stripe_account[organization_birthdate]"
      value={
        window.Uidu.current_actor.founded_at &&
        moment(window.Uidu.current_actor.founded_at).format('DD/MM/YYYY')
      }
      mask="99/99/9999"
      help={`GG/MM/AAAA - Es: ${moment().format('DD/MM/YYYY')}`}
      required
    />
    <FormHelpers.Actions>
      <FormHelpers.Submit label={window.I18n.t('utils.actions.add')} />
    </FormHelpers.Actions>
  </Formsy.Form>
);

StripeAccountActivationOrganization.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default StripeAccountActivationOrganization;
