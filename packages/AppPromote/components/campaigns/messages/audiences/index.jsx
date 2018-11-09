import React from 'react';
import {
  Form,
} from '@uidu/forms';
import {
  RadioGroup,
} from '@uidu/inputs';

// here we should list audiences to send emails to

export default function Audiences({ campaign, ...otherProps }) {
  const strategy = null;

  return (
    <Form
      handleSubmit={values => console.log(values)}
      footerRenderer={({ canSubmit }) => (
        <FormHelpers.Actions>
          <FormHelpers.Submit label="Salva e procedi" method="POST" canSubmit={canSubmit} />
        </FormHelpers.Actions>
      )}
    >
      <h1>Seleziona le audiences</h1>
      <p>Ciao {campaign.name}</p>
      <RadioGroup
        layout="elementOnly"
        value={strategy}
        name="strategy"
        wrapperClassName="panel panel-default"
        className="panel-body"
        options={[
          {
            id: 'all',
            className: 'radio-success',
            name: <div className="media">
              <div className="media-body media-middle">
                <h5 className="card-name">Invita tutti i contatti</h5>
              </div>
              <div className="media-right media-middle text-nowrap">
                Contatti invitabili
              </div>
              <div className="media-right media-middle text-nowrap">
                <a href={ContactsNew.getDefaultProps().url} target="_blank" className="btn btn-default btn-xs btn-raised">{ContactsImportsNew.getDefaultProps().label}</a>
              </div>
            </div>,
            children: strategy == "all" && <AppSectionsInvitesStrategy strategy={strategy} {...otherProps} />
          },
          {
            id: "groups",
            name: <h5 className="card-name">Invia a un gruppo specifico</h5>,
            children: strategy == "groups" && <AppSectionsInvitesStrategy strategy={strategy} {...otherProps} />
          },
          {
            id: "filters",
            name: <h5 className="card-name">Seleziona i filtri</h5>,
            children: strategy == "filters" && <AppSectionsInvitesStrategy strategy={strategy} {...otherProps} />
          },
          {
            id: "single",
            className: 'radio-success',
            name: <h5 className="card-name">Seleziona singoli contatti</h5>,
            children: strategy == "single" && <AppSectionsInvitesStrategy strategy={strategy} {...otherProps} />
          }
        ]}
        // onChange={this.handleStrategy}
        required
      />
    </Form>
  );
}
