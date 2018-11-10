import React, { Component } from 'react';
import {
  Form,
  FormFooter,
  FormMeta,
  FormDestroy,
  FormActions,
  FormSubmit,
} from '@uidu/forms';
import {
  Input,
  InputGeosuggest,
  RadioGroup,
  DateInput,
  Select,
  // Textarea,
} from '@uidu/inputs';

import AppActionBar from 'components/AppActionBar';

export default class CampaignsForm extends Component {
  handleSubmit = model => {
    const { history, object, addCampaign } = this.props;

    window.$.ajax({
      url: `${object.admin_path}/campaigns`,
      type: 'POST',
      data: model,
      xhrFields: { withCredentials: true },
      crossDomain: true,
      success(response) {
        console.log(response);
        addCampaign(response);
        history.push(`${response.id}/audiences`);
      },
      error() {
        console.log('error');
      },
    });
  };

  render() {
    const { campaign, object } = this.props;

    return (
      <Form
        handleSubmit={this.handleSubmit}
        footerRenderer={canSubmit => (
          <FormFooter>
            <FormMeta>
              {campaign.id && (
                <FormDestroy object={campaign} onDestroy={this.destroy} />
              )}
            </FormMeta>
            <FormActions>
              <FormSubmit label="Salva" canSubmit={canSubmit} />
            </FormActions>
          </FormFooter>
        )}
      >
        <Input
          type="hidden"
          name="campaign[campaignable_id]"
          value={object.id}
        />
        <Input
          type="hidden"
          name="campaign[campaignable_type]"
          value={object.klass}
        />
        <Input
          type="text"
          label={window.I18n.t('activerecord.attributes.campaign.name')}
          value={campaign.name || object.name}
          name="campaign[name]"
          required
          autoFocus
        />
        <Input
          type="text"
          label={window.I18n.t(
            'activerecord.attributes.campaign.email_subject',
          )}
          placeholder={window.I18n.t(
            'activerecord.prompts.campaign.email_subject',
          )}
          value={campaign.email_subject}
          name="campaign[email_subject]"
        />
        <Input
          type="text"
          label={window.I18n.t(
            'activerecord.attributes.campaign.email_preview',
          )}
          placeholder={window.I18n.t(
            'activerecord.prompts.campaign.email_preview',
          )}
          value={campaign.email_preview}
          name="campaign[email_preview]"
        />
        <Input
          type="text"
          label={window.I18n.t(
            'activerecord.attributes.campaign.email_from_name',
          )}
          placeholder={window.I18n.t(
            'activerecord.prompts.campaign.email_from_name',
          )}
          value={campaign.email_from_name}
          name="campaign[email_from_name]"
        />
        <Input
          type="email"
          label={window.I18n.t(
            'activerecord.attributes.campaign.email_from_email',
          )}
          placeholder={window.I18n.t(
            'activerecord.prompts.campaign.email_from_email',
          )}
          value={campaign.email_from_email}
          name="campaign[email_from_email]"
        />
      </Form>
    );
  }
}

CampaignsForm.defaultProps = {
  campaign: {},
  forms: [],
};
