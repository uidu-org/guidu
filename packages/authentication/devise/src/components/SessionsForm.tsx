import { Checkbox } from '@uidu/checkbox';
import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { messages } from './SessionsForm.messages';

export default class SessionsForm extends PureComponent<any, any> {
  handleSubmit = async model => {
    const { signIn, onSignIn, onSignInError } = this.props;
    return signIn(model)
      .then(onSignIn)
      .catch(onSignInError);
  };

  render() {
    const { routes } = this.props;
    return (
      <Fragment>
        <div className="text-center mb-4">
          <h3>
            <FormattedMessage {...messages.simple_sessions_title} />
          </h3>
          <p className="mb-0">
            <FormattedMessage {...messages.simple_sessions_description} />
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
                <FormattedMessage {...messages.simple_sessions_primary_cta} />
              }
            />,
            <Link
              to={routes.registrations}
              className="btn btn-sm shadow-none d-flex align-items-center justify-content-center mt-3"
            >
              <FormattedMessage {...messages.simple_sessions_secondary_cta} />
            </Link>,
          ]}
        >
          <FieldText
            type="email"
            label={
              <FormattedMessage {...messages.simple_sessions_email_label} />
            }
            name="user[email]"
            autoComplete="email"
            autoCorrect="off"
            required
          />
          <div className="form-group">
            <FieldPassword
              measurePasswordStrength={false}
              autoComplete="current-password"
              label={
                <FormattedMessage
                  {...messages.simple_sessions_password_label}
                />
              }
              name="user[password]"
              type="password"
              id="new-password"
              validations="minLength:8"
              required
            />
          </div>
          <div className="form-group">
            <Checkbox
              name="user[remember_me]"
              label={
                <FormattedMessage
                  {...messages.simple_sessions_remember_me_label}
                />
              }
            />
          </div>
        </Form>
      </Fragment>
    );
  }
}
