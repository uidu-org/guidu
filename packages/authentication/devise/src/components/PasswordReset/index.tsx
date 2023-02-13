import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import Form, { FormSubmit, useForm } from '@uidu/form';
import queryString from 'query-string';
import React from 'react';
import { ArrowLeft } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

export const messages = defineMessages({
  password_reset_title: {
    defaultMessage: 'Reset your password',
    id: 'uidu.devise.password_reset_title',
  },
  password_reset_description: {
    defaultMessage: 'Choose a new password to access your account',
    id: 'uidu.devise.password_reset_description',
  },
  password_reset_primary_cta: {
    defaultMessage: 'Confirm',
    id: 'uidu.devise.password_reset_primary_cta',
  },
  password_reset_secondary_cta: {
    defaultMessage: 'Sign in',
    id: 'uidu.devise.password_reset_secondary_cta',
  },
  password_reset_password_label: {
    defaultMessage: 'Insert a new password',
    id: 'uidu.devise.password_reset_email_label',
  },
});

export default function PasswordReset(props) {
  const { routes } = props;
  const location = useLocation();

  const form = useForm({});

  const handleSubmit = (model) => {
    const { resetPassword, onResetPassword } = props;
    return resetPassword(model).then(onResetPassword);
  };

  const token =
    location.search !== ''
      ? queryString.parse(location.search.slice(1)).reset_password_token
      : '';

  return (
    <div className="p-3">
      <Form
        form={form}
        handleSubmit={handleSubmit}
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
        <div className="mb-4 text-center">
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
          label={
            <FormattedMessage {...messages.password_reset_password_label} />
          }
          measurePasswordStrength={false}
          autoComplete="current-password"
          name="user[password]"
          type="password"
          id="new-password"
          validations="minLength:8"
          required
        />
      </Form>
    </div>
  );
}
