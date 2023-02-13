import FieldText from '@uidu/field-text';
import Form, { FormSubmit, useForm } from '@uidu/form';
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  passwordless_registrations_title: {
    defaultMessage: 'Sign up',
    description: 'uidu.devise.passwordless_registrations_title',
  },
  passwordless_registrations_description: {
    defaultMessage: 'Sign up with to discover stories and make impact',
    description: 'uidu.devise.passwordless_registrations_description',
  },
  passwordless_registrations_primary_cta: {
    defaultMessage: 'Sign up',
    description: 'uidu.devise.passwordless_registrations_primary_cta',
  },
  passwordless_registrations_email_label: {
    defaultMessage: 'Insert your email',
    description: 'uidu.devise.passwordless_registrations_email_label',
  },
});

export default function PasswordlessRegistrationsForm(props) {
  const { routes, signUp, additionalInfo, onSignUp, onSignUpError } = props;
  const form = useForm({});

  const handleSubmit = async ({ exists, ...model }) => {
    return signUp(model);
  };

  return (
    <>
      <div className="mb-4 text-center">
        <h3>
          <FormattedMessage {...messages.passwordless_registrations_title} />
        </h3>
        <p className="mb-0">
          <FormattedMessage
            {...messages.passwordless_registrations_description}
          />
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
                {...messages.passwordless_registrations_primary_cta}
              />
            }
          />,
        ]}
      >
        <FieldText
          type="email"
          label={
            <FormattedMessage
              {...messages.passwordless_registrations_email_label}
            />
          }
          name="user[email]"
          autoComplete="email"
          autoCorrect="off"
          required
        />
        {additionalInfo}
      </Form>
    </>
  );
}
