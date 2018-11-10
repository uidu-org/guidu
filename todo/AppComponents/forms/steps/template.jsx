import React, { PureComponent } from 'react';
import { Form, FormSubmit } from '@uidu/forms';
import { Select } from '@uidu/inputs';
import { apiCall } from 'utils';

export default class SelectFormTemplate extends PureComponent {
  fetchForms = input =>
    apiCall('get', `/dashboard/apps/forms/forms?q[name_cont]=${input}`).then(
      response => response.data,
    );

  handleSubmit = () => {
    const { form, onFormSelect } = this.props;
    onFormSelect(form);
  };

  render() {
    const { form, onFormSelect } = this.props;
    return (
      <div className="card-body py-0 px-3 d-flex flex-column justify-content-center">
        <div className="row">
          <div className="col-sm-12">
            <Form
              handleSubmit={this.handleSubmit}
              submitted
              footerRenderer={() => {}}
            >
              <div className="form-group">
                <label
                  htmlFor="new-form"
                  className="w-100 mb-2 d-flex align-items-center justify-content-between"
                >
                  <span>Seleziona un form tra i tuoi</span>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      onFormSelect('');
                    }}
                  >
                    + Nuovo form da zero
                  </a>
                </label>
                <Select
                  rowClassName="mb-0"
                  name="form_id"
                  value={form}
                  layout="elementOnly"
                  getOptionLabel={option => option.name}
                  loadOptions={this.fetchForms}
                  onChange={(name, value) => onFormSelect(value)}
                  cacheOptions
                  async
                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                  menuPortalTarget={document.body}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
