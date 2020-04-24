import { Form, FormSubmit } from '@uidu/form';
import queryString from 'query-string';
import React from 'react';
import { ArrowLeft } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const messages = defineMessages({
  email_sessions_email_title: {
    id: 'guidu.devise.email_sessions_email_title',
    defaultMessage: 'Sign in with your email',
    description: 'email_sessions_email_title',
  },
  email_sessions_email_description: {
    id: 'guidu.devise.email_sessions_email_description',
    defaultMessage: 'Use your favourite email account',
    description: 'email_sessions_email_description',
  },
  email_sessions_info_title: {
    id: 'guidu.devise.email_sessions_info_title',
    defaultMessage: 'Fill your data to sign in',
    description: 'email_sessions_info_title',
  },
  email_sessions_info_description: {
    id: 'guidu.devise.email_sessions_info_description',
    defaultMessage: 'email_sessions_info_description',
    description: 'email_sessions_info_description',
  },
  email_sessions_password_title: {
    id: 'guidu.devise.email_sessions_password_title',
    defaultMessage: 'Insert your password',
    description: 'email_sessions_password_title',
  },
  email_sessions_password_description: {
    id: 'guidu.devise.email_sessions_password_description',
    defaultMessage: 'email_sessions_password_description',
    description: 'email_sessions_password_description',
  },
  email_registrations_email_title: {
    id: 'guidu.devise.email_registrations_email_title',
    defaultMessage: 'Sign up with your email',
    description: 'email_registrations_email_title',
  },
  email_registrations_email_description: {
    id: 'guidu.devise.email_registrations_email_description',
    defaultMessage: 'Use a valid email address',
    description: 'email_registrations_email_description',
  },
  email_registrations_info_title: {
    id: 'guidu.devise.email_registrations_info_title',
    defaultMessage: 'email_registrations_info_title',
    description: 'email_registrations_info_title',
  },
  email_registrations_info_description: {
    id: 'guidu.devise.email_registrations_info_description',
    defaultMessage: 'email_registrations_info_description',
    description: 'email_registrations_info_description',
  },
  email_registrations_password_title: {
    id: 'guidu.devise.email_registrations_password_title',
    defaultMessage: 'email_registrations_password_title',
    description: 'email_registrations_password_title',
  },
  email_registrations_password_description: {
    id: 'guidu.devise.email_registrations_password_description',
    defaultMessage: 'email_registrations_password_description',
    description: 'email_registrations_password_description',
  },
  email_registrations_email_cta: {
    id: 'guidu.devise.email_registrations_email_cta',
    defaultMessage: 'Sign up',
    description: 'email_registrations_email_cta',
  },
});

export default function DeviseForm({
  match: {
    params: { step },
  },
  scope,
  match,
  children,
  signUp,
  location,
}) {
  // private recaptchaInstance = React.createRef();
  const form = React.createRef();

  // handleSubmit = async () => {
  //   (this.recaptchaInstance.current as any).execute();
  // };

  // // executed once the captcha has been verified
  // // can be used to post forms, redirect, etc.
  // verifyCallback = captchaResponse => {
  //   const { signUp } = this.props;
  //   return signUp({
  //     ...(this.form.current as any).form.getModel(),
  //     'g-recaptcha-response': captchaResponse,
  //   });
  // };

  const email =
    location.search !== ''
      ? queryString.parse(location.search.slice(1)).email
      : '';

  return (
    <>
      <div className="mb-4">
        <Link to={match.path}>
          <ArrowLeft className="mr-2" size={18} />
          Indietro
        </Link>
      </div>
      <div className="mb-4 text-center">
        <h3>
          <FormattedMessage
            {...messages[`email_${scope}_${step || 'email'}_title`]}
          />
        </h3>
        <p className="mb-0">
          <FormattedMessage
            {...messages[`email_${scope}_${step || 'email'}_description`]}
          />
        </p>
      </div>
      <Form
        ref={form}
        handleSubmit={signUp}
        footerRenderer={({ canSubmit, loading }) => [
          <div className="d-flex justify-content-between">
            <FormSubmit
              className="btn-primary btn-block"
              canSubmit={canSubmit}
              loading={loading}
              label={
                <FormattedMessage
                  {...messages[`email_${scope}_${step || 'email'}_cta`]}
                />
              }
            />
          </div>,
        ]}
      >
        {children({ email })}
        {/* <div className="form-group">
            <Recaptcha
              ref={this.recaptchaInstance}
              sitekey="6LdLkqgUAAAAAPNT6KJn0Emp5bgJw3N9CQ-n27Dg"
              size="invisible"
              render="explicit"
              badge="inline"
              verifyCallback={this.verifyCallback}
            />
          </div> */}
      </Form>
    </>
  );
}
