import FieldText from '@uidu/field-text';
import { Form, FormActions, FormFooter, FormSubmit } from '@uidu/form';
import React, { PureComponent } from 'react';

export default class DeviseStepInfo extends PureComponent<any> {
  handleSubmit = async model => {
    const { onSave, history, routes } = this.props;
    return onSave(model.user).then(() =>
      history.push(`${routes.sessions}/email/password`),
    );
  };

  render() {
    const { currentIdentity } = this.props;
    return (
      <Form
        handleSubmit={this.handleSubmit}
        footerRenderer={({ canSubmit }) => (
          <FormFooter>
            <FormActions className="w-100">
              <FormSubmit
                className="btn-primary w-100"
                canSubmit={canSubmit}
                label={'utils.actions.sign_up'}
              />
            </FormActions>
          </FormFooter>
        )}
      >
        <FieldText
          type="text"
          label={'activerecord.attributes.user.first_name'}
          name="user[first_name]"
          autoComplete="given-name"
          value={currentIdentity ? currentIdentity.data.firstName : ''}
          required
        />
        <FieldText
          type="text"
          label={'activerecord.attributes.user.last_name'}
          name="user[last_name]"
          autoComplete="family-name"
          value={currentIdentity ? currentIdentity.data.lastName : ''}
          required
        />
      </Form>
    );
  }
}
