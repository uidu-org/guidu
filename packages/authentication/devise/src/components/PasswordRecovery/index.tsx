import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import queryString from 'query-string';
import React, { PureComponent } from 'react';
import { ArrowLeft } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const messages = defineMessages({
  password_recovery_title: {
    defaultMessage: 'Recover your password',
    id: 'uidu.devise.password_recovery_title',
  },
  password_recovery_description: {
    defaultMessage:
      "Insert your email, we'll send you instructions on how to reset your account",
    id: 'uidu.devise.password_recovery_description',
  },
  password_recovery_primary_cta: {
    defaultMessage: 'Send email',
    id: 'uidu.devise.password_recovery_primary_cta',
  },
  password_recovery_secondary_cta: {
    defaultMessage: 'Sign in',
    id: 'uidu.devise.password_recovery_secondary_cta',
  },
  password_recovery_email_label: {
    defaultMessage: 'Insert your email',
    id: 'uidu.devise.password_recovery_email_label',
  },
});

export default class PasswordRecovery extends PureComponent<any> {
  handleSubmit = (model) => {
    const { recoverPassword, onRecoverPassword } = this.props;
    return recoverPassword(model).then(onRecoverPassword);
  };

  render() {
    const { location, routes, match } = this.props;

    const email =
      location.search !== ''
        ? queryString.parse(location.search.slice(1)).email
        : '';

    return (
      <div className="p-3">
        <Form
          handleSubmit={this.handleSubmit}
          footerRenderer={({ canSubmit, loading }) => (
            <div className="d-flex align-items-center justify-content-between">
              <FormSubmit
                className="btn-primary w-100"
                canSubmit={canSubmit}
                loading={loading}
                label={
                  <FormattedMessage
                    {...messages.password_recovery_primary_cta}
                  />
                }
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
      </div>
    );
  }
}
