import React, { PureComponent } from 'react';
import {
  Form,
  FormFooter,
  FormMeta,
  FormActions,
  FormSubmit,
} from '@uidu/forms';
import { Input, Select } from '@uidu/inputs';
import debounce from 'lodash/debounce';
import { apiCall } from 'utils';
import { contactOptionRenderer } from 'apps/contacts/utils';

export default class FindOrCreateContact extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newContact: false,
      changeContact: false,
    };
  }

  getOptions = input =>
    apiCall('get', `/dashboard/apps/contacts/contacts/search?q=${input}`).then(
      response => response.data,
    );

  handleChange = (name, value, actionMeta) => {
    if (actionMeta && actionMeta.action === 'create-option') {
      this.setState({
        newContact: true,
      });
    }
  };

  handleSubmit = model => {
    const { onSave, createContact } = this.props;
    const { newContact } = this.state;
    if (newContact) {
      return createContact(model);
    }
    return model.contact;
  };

  render() {
    const { onSave, scope, contact } = this.props;
    const { newContact, changeContact } = this.state;

    if (contact && !changeContact) {
      return (
        <div className="card card-body">
          <div className="media align-items-center">
            <img
              alt={contact.name}
              src={contact.avatar.thumb}
              className="align-self-center rounded-circle mr-3"
              width={64}
            />
            <div
              className="media-body align-self-center"
              style={{ minWidth: 0 }}
            >
              <h6 className="text-medium mb-0 text-truncate">{contact.name}</h6>
              <p className="text-muted mb-0 text-truncate">{contact.email}</p>
            </div>
            <button
              type="button"
              className="btn ml-3"
              onClick={e => {
                e.preventDefault();
                this.setState({ changeContact: true });
              }}
            >
              Cambia
            </button>
          </div>
        </div>
      );
    }

    return (
      <Form
        handleSubmit={async model => onSave(await this.handleSubmit(model))}
        footerRenderer={({ canSubmit, loading }) => (
          <div className="row">
            <div className="col-sm-6 col-lg-4 mb-3 mb-md-0">
              <FormSubmit
                label={newContact ? 'Crea contatto' : 'Salva'}
                className={`btn btn-${scope} btn-block`}
                canSubmit={canSubmit}
                loading={loading}
              />
            </div>
            {newContact && (
              <div className="col-sm-6 col-lg-3">
                <button
                  type="button"
                  className="btn btn-block"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ newContact: false });
                  }}
                >
                  Annulla
                </button>
              </div>
            )}
          </div>
        )}
      >
        {newContact ? (
          <div>
            <Input
              type="email"
              label="Indirizzo email"
              name="contact[email]"
              required
              autoFocus
            />
            <div className="row">
              <div className="col-sm-6">
                <Input type="text" label="Nome" name="contact[first_name]" />
              </div>
              <div className="col-sm-6">
                <Input type="text" label="Cognome" name="contact[last_name]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="form-group">
            <label
              htmlFor="new-contact"
              className="w-100 mb-2 d-flex align-items-center justify-content-between"
            >
              <span>* Seleziona un contatto</span>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ newContact: true });
                }}
              >
                + Nuovo contatto
              </a>
            </label>
            <Select
              id="new-contact"
              name="contact"
              layout="elementOnly"
              loadOptions={this.getOptions}
              onChange={this.handleChange}
              components={{
                Option: contactOptionRenderer('option'),
                SingleValue: contactOptionRenderer('value'),
              }}
              async
              create
              searchable
              required
            />
          </div>
        )}
      </Form>
    );
  }
}
