import React from 'react';

export default ({ stripeAccount }) => (
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
          abilitare questa funzionalità. Riceverai all'indirizzo email email la
          conferma di attivazione e sei pronto a cominciare!
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-header">Dati organizzazione</div>
      <div className="card-body">
        <address className="m-b-0">
          <strong>{stripeAccount.organization_name}</strong>
          <br />
          {stripeAccount.organization_address}
          <br />
          {stripeAccount.organization_city}, {stripeAccount.organization_state}{' '}
          {stripeAccount.organization_postal_code}
          <br />
          <abbr title="Codice Fiscale">CF:</abbr>{' '}
          {stripeAccount.organization_fiscal_code}
        </address>
      </div>
    </div>
    <div className="card">
      <div className="card-header">Legale rappresentante</div>
      <div className="card-body">
        <address className="m-b-0">
          <strong>
            {stripeAccount.legal_entity_owner_first_name}{' '}
            {stripeAccount.legal_entity_owner_last_name}
          </strong>
          <br />
          CF: {stripeAccount.legal_entity_owner_personal_id}
          <br />
          {stripeAccount.legal_entity_owner_address}
          <br />
          {stripeAccount.legal_entity_owner_city},{' '}
          {stripeAccount.legal_entity_owner_state}{' '}
          {stripeAccount.legal_entity_owner_postal_code}
        </address>
      </div>
    </div>
    <div className="card">
      <div className="card-header">Conto Corrente</div>
      <div className="card-body">
        <p>
          <b>{stripeAccount.bank_account_account_number}</b>
          {' intestato a '}
          <b>{stripeAccount.bank_account_account_holder_name}</b>
        </p>
      </div>
    </div>
  </div>
);
