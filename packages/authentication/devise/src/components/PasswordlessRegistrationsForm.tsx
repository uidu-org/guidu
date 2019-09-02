import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { Fragment, PureComponent } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const messages = defineMessages({
  simple_registrations_title: {
    id: 'guidu.devise.simple_registrations_title',
    defaultMessage: 'Sign up',
    description: 'simple_registrations_title',
  },
  simple_registrations_description: {
    id: 'guidu.devise.simple_registrations_description',
    defaultMessage: 'Sign up with to discover stories and make impact',
    description: 'simple_registrations_description',
  },
  simple_registrations_primary_cta: {
    id: 'guidu.devise.simple_registrations_primary_cta',
    defaultMessage: 'Sign up',
    description: 'simple_registrations_primary_cta',
  },
  simple_registrations_secondary_cta: {
    id: 'guidu.devise.simple_registrations_secondary_cta',
    defaultMessage: 'Already have an account?',
    description: 'simple_registrations_secondary_cta',
  },
  simple_registrations_email_label: {
    id: 'guidu.devise.simple_registrations_email_label',
    defaultMessage: 'Insert your email',
    description: 'simple_registrations_email_label',
  },
  simple_registrations_password_label: {
    id: 'guidu.devise.simple_registrations_password_label',
    defaultMessage: 'Choose a password',
    description: 'simple_registrations_email_label',
  },
  simple_registrations_remember_me_label: {
    id: 'guidu.devise.simple_registrations_remember_me_label',
    defaultMessage: 'Remember me for next registrations',
    description: 'simple_registrations_email_label',
  },
});

export default class RegistrationsForm extends PureComponent<any, any> {
  handleSubmit = async ({ exists, ...model }) => {
    const { onSignUp, signUp, onSignUpError } = this.props;
    return signUp(model);
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
          {additionalInfo}
        </Form>
      </Fragment>
    );
  }
}
