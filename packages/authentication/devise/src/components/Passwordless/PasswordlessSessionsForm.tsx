import FieldText from '@uidu/field-text';
import Form, { FormSubmit, useForm } from '@uidu/form';
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  passwordless_sessions_title: {
    defaultMessage: 'Sign in',
    id: 'uidu.devise.passwordless_sessions_title',
  },
  passwordless_sessions_description: {
    defaultMessage: 'Sign in with your email and password',
    id: 'uidu.devise.passwordless_sessions_description',
  },
  passwordless_sessions_primary_cta: {
    defaultMessage: 'Sign in',
    id: 'uidu.devise.passwordless_sessions_primary_cta',
  },
  passwordless_sessions_email_label: {
    defaultMessage: 'Insert your email',
    id: 'uidu.devise.passwordless_sessions_email_label',
  },
});

export default function PasswordlessSessionsForm(props) {
  const { routes, requestPasswordlessToken } = props;
  const form = useForm({});

  const handleSubmit = async (model) => {
    return requestPasswordlessToken(model);
  };

  return (
    <>
      <div className="mb-4 text-center">
        <h3>
          <FormattedMessage {...messages.passwordless_sessions_title} />
        </h3>
        <p className="mb-0">
          <FormattedMessage {...messages.passwordless_sessions_description} />
        </p>
      </div>
      <Form
        form={form}
        handleSubmit={handleSubmit}
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
            <FormattedMessage {...messages.passwordless_sessions_email_label} />
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
