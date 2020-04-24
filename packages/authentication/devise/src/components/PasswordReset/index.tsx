import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import queryString from 'query-string';
import React, { PureComponent } from 'react';
import { ArrowLeft } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const messages = defineMessages({
  password_reset_title: {
    id: 'guidu.devise.password_reset_title',
    defaultMessage: 'Reset your password',
    description: 'password_reset_title',
  },
  password_reset_description: {
    id: 'guidu.devise.password_reset_description',
    defaultMessage: 'Choose a new password to access your account',
    description: 'password_reset_description',
  },
  password_reset_primary_cta: {
    id: 'guidu.devise.password_reset_primary_cta',
    defaultMessage: 'Confirm',
    description: 'password_reset_primary_cta',
  },
  password_reset_secondary_cta: {
    id: 'guidu.devise.password_reset_secondary_cta',
    defaultMessage: 'Sign in',
    description: 'password_reset_secondary_cta',
  },
  password_reset_password_label: {
    id: 'guidu.devise.password_reset_email_label',
    defaultMessage: 'Insert a new password',
    description: 'password_reset_email_label',
  },
});

export default class PasswordReset extends PureComponent<any> {
  handleSubmit = (model) => {
    const { resetPassword, onResetPassword } = this.props;
    return resetPassword(model).then(onResetPassword);
  };

  render() {
    const { location, routes } = this.props;

    const token =
      location.search !== ''
        ? queryString.parse(location.search.slice(1)).reset_password_token
        : '';

    return (
      <div className="p-3">
        <Form
          handleSubmit={this.handleSubmit}
          // submitted={false}
          footerRenderer={({ canSubmit, loading }) => (
            <div className="d-flex align-items-center justify-content-between">
              <FormSubmit
                className="btn-primary w-100"
                label={
                  <FormattedMessage {...messages.password_reset_primary_cta} />
                }
                loading={loading}
                canSubmit={canSubmit}
              />
            </div>
          )}
        >
          <div className="mb-4">
            <Link to={routes.sessions}>
              <ArrowLeft className="mr-2" size={18} />
              Indietro
            </Link>
          </div>
          <div className="text-center mb-4">
            <h3>
              <FormattedMessage {...messages.password_reset_title} />
            </h3>
            <p className="mb-0">
              <FormattedMessage {...messages.password_reset_description} />
            </p>
          </div>
          <FieldText
            type="hidden"
            name="user[reset_password_token]"
            value={token}
            required
          />
          <FieldPassword
            type="password"
            label={
              <FormattedMessage {...messages.password_reset_password_label} />
            }
            name="user[password]"
            required
          />
        </Form>
      </div>
    );
  }
}
