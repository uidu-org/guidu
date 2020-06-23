import { Form, FormSubmit } from '@uidu/form';
import queryString from 'query-string';
import React from 'react';
import { ArrowLeft } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const messages = defineMessages({
  phone_sessions_phone_title: {
    id: 'guidu.devise.phone_sessions_phone_title',
    defaultMessage: 'Sign in with your phone',
    description: 'phone_sessions_phone_title',
  },
  phone_sessions_phone_description: {
    id: 'guidu.devise.phone_sessions_phone_description',
    defaultMessage: 'Use your favourite phone account',
    description: 'phone_sessions_phone_description',
  },
  phone_sessions_info_title: {
    id: 'guidu.devise.phone_sessions_info_title',
    defaultMessage: 'Fill your data to sign in',
    description: 'phone_sessions_info_title',
  },
  phone_sessions_info_description: {
    id: 'guidu.devise.phone_sessions_info_description',
    defaultMessage: 'phone_sessions_info_description',
    description: 'phone_sessions_info_description',
  },
  phone_sessions_password_title: {
    id: 'guidu.devise.phone_sessions_password_title',
    defaultMessage: 'Insert your password',
    description: 'phone_sessions_password_title',
  },
  phone_sessions_password_description: {
    id: 'guidu.devise.phone_sessions_password_description',
    defaultMessage: 'phone_sessions_password_description',
    description: 'phone_sessions_password_description',
  },
  phone_registrations_phone_title: {
    id: 'guidu.devise.phone_registrations_phone_title',
    defaultMessage: 'Sign up with your phone',
    description: 'phone_registrations_phone_title',
  },
  phone_registrations_phone_description: {
    id: 'guidu.devise.phone_registrations_phone_description',
    defaultMessage: 'Use a valid phone address',
    description: 'phone_registrations_phone_description',
  },
  phone_registrations_info_title: {
    id: 'guidu.devise.phone_registrations_info_title',
    defaultMessage: 'phone_registrations_info_title',
    description: 'phone_registrations_info_title',
  },
  phone_registrations_info_description: {
    id: 'guidu.devise.phone_registrations_info_description',
    defaultMessage: 'phone_registrations_info_description',
    description: 'phone_registrations_info_description',
  },
  phone_registrations_password_title: {
    id: 'guidu.devise.phone_registrations_password_title',
    defaultMessage: 'phone_registrations_password_title',
    description: 'phone_registrations_password_title',
  },
  phone_registrations_password_description: {
    id: 'guidu.devise.phone_registrations_password_description',
    defaultMessage: 'phone_registrations_password_description',
    description: 'phone_registrations_password_description',
  },
  phone_registrations_phone_cta: {
    id: 'guidu.devise.phone_registrations_phone_cta',
    defaultMessage: 'Sign up',
    description: 'phone_registrations_phone_cta',
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

  const phone =
    location.search !== ''
      ? queryString.parse(location.search.slice(1)).phone
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
            {...messages[`phone_${scope}_${step || 'phone'}_title`]}
          />
        </h3>
        <p className="mb-0">
          <FormattedMessage
            {...messages[`phone_${scope}_${step || 'phone'}_description`]}
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
                  {...messages[`phone_${scope}_${step || 'phone'}_cta`]}
                />
              }
            />
          </div>,
        ]}
      >
        {children({ phone })}
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
