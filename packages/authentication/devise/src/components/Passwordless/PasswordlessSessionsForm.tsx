import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { PureComponent } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  passwordless_sessions_title: {
    id: 'guidu.devise.passwordless_sessions_title',
    defaultMessage: 'Sign in',
    description: 'passwordless_sessions_title',
  },
  passwordless_sessions_description: {
    id: 'guidu.devise.passwordless_sessions_description',
    defaultMessage: 'Sign in with your email and password',
    description: 'passwordless_sessions_description',
  },
  passwordless_sessions_primary_cta: {
    id: 'guidu.devise.passwordless_sessions_primary_cta',
    defaultMessage: 'Sign in',
    description: 'passwordless_sessions_primary_cta',
  },
  passwordless_sessions_email_label: {
    id: 'guidu.devise.passwordless_sessions_email_label',
    defaultMessage: 'Insert your email',
    description: 'passwordless_sessions_email_label',
  },
});

export default class PasswordlessSessionsForm extends PureComponent<any, any> {
  handleSubmit = async model => {
    const { requestPasswordlessToken } = this.props;
    return requestPasswordlessToken(model);
  };

  render() {
    const { routes } = this.props;
    return (
      <>
        <div className="text-center mb-4">
          <h3>
            <FormattedMessage {...messages.passwordless_sessions_title} />
          </h3>
          <p className="mb-0">
            <FormattedMessage {...messages.passwordless_sessions_description} />
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
                  {...messages.passwordless_sessions_primary_cta}
                />
              }
            />,
          ]}
        >
          <FieldText
            type="email"
            label={
              <FormattedMessage
                {...messages.passwordless_sessions_email_label}
              />
            }
            name="user[email]"
            autoComplete="email"
            autoCorrect="off"
            required
          />
        </Form>
      </>
    );
  }
}
