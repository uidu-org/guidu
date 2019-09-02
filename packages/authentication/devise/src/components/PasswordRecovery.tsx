import FieldText from '@uidu/field-text';
import { Form, FormFooter, FormSubmit } from '@uidu/form';
import queryString from 'query-string';
import React, { Component } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const messages = defineMessages({
  password_recovery_title: {
    id: 'guidu.devise.password_recovery_title',
    defaultMessage: 'Recover your password',
    description: 'password_recovery_title',
  },
  password_recovery_description: {
    id: 'guidu.devise.password_recovery_description',
    defaultMessage:
      "Insert your email, we'll send you instructions on how to reset your account",
    description: 'password_recovery_description',
  },
  password_recovery_primary_cta: {
    id: 'guidu.devise.password_recovery_primary_cta',
    defaultMessage: 'Send email',
    description: 'password_recovery_primary_cta',
  },
  password_recovery_secondary_cta: {
    id: 'guidu.devise.password_recovery_secondary_cta',
    defaultMessage: 'Sign in',
    description: 'password_recovery_secondary_cta',
  },
  password_recovery_email_label: {
    id: 'guidu.devise.password_recovery_email_label',
    defaultMessage: 'Insert your email',
    description: 'password_recovery_email_label',
  },
});

export default class PasswordRecovery extends Component<any> {
  handleSubmit = model => {
    const { recoverPassword, onRecoverPassword } = this.props;
    return recoverPassword(model).then(onRecoverPassword);
  };

  render() {
    const { location, routes } = this.props;

    const email =
      location.search !== ''
        ? queryString.parse(location.search.slice(1)).email
        : '';

    return (
      <Form
        handleSubmit={this.handleSubmit}
        // submitted={false}
        footerRenderer={({ canSubmit, loading }) => [
          <FormFooter className="w-100">
            <FormSubmit
              className="btn-primary w-100"
              label={
                <FormattedMessage {...messages.password_recovery_primary_cta} />
              }
              loading={loading}
              canSubmit={canSubmit}
            />
          </FormFooter>,
          <Link
            to={routes.sessions}
            className="btn btn-sm shadow-none d-flex align-items-center justify-content-center mt-3"
          >
            <FormattedMessage {...messages.password_recovery_secondary_cta} />
          </Link>,
        ]}
      >
        <div className="text-center mb-4">
          <h3>
            <FormattedMessage {...messages.password_recovery_title} />
          </h3>
          <p className="mb-0">
            <FormattedMessage {...messages.password_recovery_description} />
          </p>
        </div>
        <FieldText
          type="email"
          label={
            <FormattedMessage {...messages.password_recovery_email_label} />
          }
          name="user[email]"
          value={email}
          required
        />
      </Form>
    );
  }
}
