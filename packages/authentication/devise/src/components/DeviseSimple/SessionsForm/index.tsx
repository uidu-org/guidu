import Checkbox from '@uidu/checkbox';
import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { PureComponent } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const messages = defineMessages({
  simple_sessions_title: {
    defaultMessage: 'Sign in',
    id: 'uidu.devise.simple_sessions_title',
  },
  simple_sessions_description: {
    defaultMessage: 'Sign in with your email and password',
    id: 'uidu.devise.simple_sessions_description',
  },
  simple_sessions_primary_cta: {
    defaultMessage: 'Sign in',
    id: 'uidu.devise.simple_sessions_primary_cta',
  },
  simple_sessions_secondary_cta: {
    defaultMessage: 'Create an account',
    id: 'uidu.devise.simple_sessions_secondary_cta',
  },
  simple_sessions_email_label: {
    defaultMessage: 'Insert your email',
    id: 'uidu.devise.simple_sessions_email_label',
  },
  simple_sessions_password_label: {
    defaultMessage: 'Insert your password',
    id: 'uidu.devise.simple_sessions_password_label',
  },
  simple_sessions_remember_me_label: {
    defaultMessage: 'Remember me for next sessions',
    id: 'uidu.devise.simple_sessions_remember_me_label',
  },
});

export default class SessionsForm extends PureComponent<any, any> {
  handleSubmit = async (model) => {
    const { signIn } = this.props;
    return signIn(model);
  };

  render() {
    const { routes } = this.props;
    return (
      <>
        <div className="mb-4 text-center">
          <h3>
            <FormattedMessage {...messages.simple_sessions_title} />
          </h3>
          <p className="mb-0">
            <FormattedMessage {...messages.simple_sessions_description} />
          </p>
        </div>
        <Form
          handleSubmit={this.handleSubmit}
          footerRenderer={({ canSubmit, loading }) => (
            <div className="d-flex justify-content-between">
              <Link
                to={routes.registrations}
                className="btn btn-sm d-flex align-items-center justify-content-center btn-light"
              >
                Create account
              </Link>
              <FormSubmit
                className="btn-primary"
                canSubmit={canSubmit}
                loading={loading}
                label={
                  <FormattedMessage {...messages.simple_sessions_primary_cta} />
                }
              />
            </div>
          )}
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
              layout="elementOnly"
              name="user[remember_me]"
              label={
                <FormattedMessage
                  {...messages.simple_sessions_remember_me_label}
                />
              }
            />
          </div>
        </Form>
      </>
    );
  }
}
