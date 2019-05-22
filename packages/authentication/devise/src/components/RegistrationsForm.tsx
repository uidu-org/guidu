import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { messages } from './RegistrationsForm.messages';

export default class RegistrationsForm extends PureComponent<any, any> {
  handleSubmit = async ({ exists, ...model }) => {
    const { onSignUp, signUp, onSignUpError } = this.props;
    return signUp(model)
      .then(onSignUp)
      .catch(onSignUpError);
  };

  render() {
    const { routes, additionalInfo } = this.props;
    return (
      <Fragment>
        <div className="text-center mb-4">
          <h3>
            <FormattedMessage {...messages.simple_registrations_title} />
          </h3>
          <p className="mb-0">
            <FormattedMessage {...messages.simple_registrations_description} />
          </p>
        </div>
        <Form
          handleSubmit={this.handleSubmit}
          footerRenderer={({ canSubmit, loading }) => [
            <FormSubmit
              className="btn-primary w-100"
              canSubmit={canSubmit}
              loading={loading}
              label={
                <FormattedMessage
                  {...messages.simple_registrations_primary_cta}
                />
              }
            />,
            <Link
              to={routes.sessions}
              className="btn btn-sm shadow-none d-flex align-items-center justify-content-center mt-3"
            >
              <FormattedMessage
                {...messages.simple_registrations_secondary_cta}
              />
            </Link>,
          ]}
        >
          <FieldText
            type="email"
            label={
              <FormattedMessage
                {...messages.simple_registrations_email_label}
              />
            }
            name="user[email]"
            autoComplete="email"
            autoCorrect="off"
            required
          />
          <div className="form-group">
            <FieldPassword
              autoComplete="current-password"
              label={
                <FormattedMessage
                  {...messages.simple_registrations_password_label}
                />
              }
              name="user[password]"
              type="password"
              id="new-password"
              validations="minLength:8"
              required
            />
          </div>
          {additionalInfo}
        </Form>
      </Fragment>
    );
  }
}
