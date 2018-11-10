import React from 'react';

const StripeAccountActivationStatus = ({ stripe_account }) => (
  <div>
    <div className="alert alert-warning">
      <div className="media">
        <div className="media-left">
          <img alt="Work in progress" src="/images/icons/wip.png" width={64} />
        </div>
        <div className="media-body">
          <b>Abbiamo ricevuto la tua richiesta</b>.
          <br />
          Ora dobbiamo analizzare le informazioni che ci hai mandato prima di
          abilitare questa funzionalità. Riceverai all'indirizzo email{' '}
          {window.Uidu.current_user.email} la conferma di attivazione e sei
          pronto a cominciare!
        </div>
      </div>
    </div>
    <Panel>
      <Panel.Header>Dati organizzazione</Panel.Header>
      <Panel.Body>
        <address className="m-b-0">
          <strong>{stripe_account.organization_name}</strong>
          <br />
          {stripe_account.organization_address}
          <br />
          {stripe_account.organization_city},{' '}
          {stripe_account.organization_state}{' '}
          {stripe_account.organization_postal_code}
          <br />
          <abbr title="Codice Fiscale">CF:</abbr>{' '}
          {stripe_account.organization_fiscal_code}
        </address>
      </Panel.Body>
    </Panel>
    <Panel>
      <Panel.Header>Legale rappresentante</Panel.Header>
      <Panel.Body>
        <address className="m-b-0">
          <strong>
            {stripe_account.legal_entity_owner_first_name}{' '}
            {stripe_account.legal_entity_owner_last_name}
          </strong>
          <br />
          CF: {stripe_account.legal_entity_owner_personal_id}
          <br />
          {stripe_account.legal_entity_owner_address}
          <br />
          {stripe_account.legal_entity_owner_city},{' '}
          {stripe_account.legal_entity_owner_state}{' '}
          {stripe_account.legal_entity_owner_postal_code}
        </address>
      </Panel.Body>
    </Panel>
    <Panel>
      <Panel.Header>Conto Corrente</Panel.Header>
      <Panel.Body>
        <p>
          <b>{stripe_account.bank_account_account_number}</b>
          {' intestato a '}
          <b>{stripe_account.bank_account_account_holder_name}</b>
        </p>
      </Panel.Body>
    </Panel>
  </div>
);

export default StripeAccountActivationStatus;
