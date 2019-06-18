import { Checkbox } from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import { Form, FormFooter, FormSubmit } from '@uidu/form';
import { Textarea } from '@uidu/inputs';
import React, { Component } from 'react';
// import { apiCall } from 'utils';

export default class DonationPreferences extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      anonymous: false,
    };
  }

  anonymize = e => {
    e.preventDefault();
    const { anonymous } = this.state;
    this.setState({
      anonymous: !anonymous,
    });
  };

  handleSubmit = model => {
    const { donation } = this.props;
    console.log(donation);
    console.log(model);
    // return apiCall('patch', donation.path, model);
  };

  render() {
    const { currentMember } = this.props;
    const { anonymous } = this.state;
    return (
      <Form
        handleSubmit={this.handleSubmit}
        footerRenderer={({ canSubmit }) => (
          <FormFooter>
            <FormSubmit
              label="Salva"
              canSubmit={canSubmit}
              className="px-5 btn-donations btn-block"
            />
          </FormFooter>
        )}
      >
        <Textarea
          rows={3}
          label="Lascia un messaggio (opzionale)"
          name="donation[body]"
          className="form-control form-control-autosize"
        />
        <div className="form-group">
          <label
            className="mb-2 w-100 d-flex justify-content-between"
            htmlFor="donation-display-name"
          >
            <span>
              'activerecord.attributes.donation.preferences.display_name',
            </span>
            <a role="button" tabIndex={0} onClick={this.anonymize}>
              {anonymous
                ? 'Inserisci il nome'
                : 'activerecord.attributes.donation.preferences.anonymous'}
            </a>
          </label>
          <FieldText
            type="text"
            layout="elementOnly"
            name="donation[preferences][display_name]"
            id="donation-display-name"
            value={anonymous ? '' : currentMember && currentMember.name}
            help={'activerecord.hints.donation.preferences.display_name'}
            disabled={anonymous}
          />
        </div>
        <div className="form-group">
          <Checkbox
            label="Anonimo"
            name="donation[preferences][anonymous]"
            layout="elementOnly"
            value={anonymous ? 'true' : 'false'}
          />
        </div>
      </Form>
    );
  }
}
