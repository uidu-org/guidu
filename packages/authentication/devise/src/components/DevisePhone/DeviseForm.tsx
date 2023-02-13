import { Form, FormSubmit, useForm } from '@uidu/form';
import queryString from 'query-string';
import React from 'react';
import { ArrowLeft } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

export const messages = defineMessages({
  phone_sessions_phone_title: {
    defaultMessage: 'Sign in with your phone',
    id: 'uidu.devise.phone_sessions_phone_title',
  },
  phone_sessions_phone_description: {
    defaultMessage: 'Use your favourite phone account',
    id: 'uidu.devise.phone_sessions_phone_description',
  },
  phone_sessions_info_title: {
    defaultMessage: 'Fill your data to sign in',
    id: 'uidu.devise.phone_sessions_info_title',
  },
  phone_sessions_info_description: {
    defaultMessage: 'phone_sessions_info_description',
    id: 'uidu.devise.phone_sessions_info_description',
  },
  phone_sessions_password_title: {
    defaultMessage: 'Insert your password',
    id: 'uidu.devise.phone_sessions_password_title',
  },
  phone_sessions_password_description: {
    defaultMessage: 'phone_sessions_password_description',
    id: 'uidu.devise.phone_sessions_password_description',
  },
  phone_registrations_phone_title: {
    defaultMessage: 'Sign up with your phone',
    id: 'uidu.devise.phone_registrations_phone_title',
  },
  phone_registrations_phone_description: {
    defaultMessage: 'Use a valid phone address',
    id: 'uidu.devise.phone_registrations_phone_description',
  },
  phone_registrations_info_title: {
    defaultMessage: 'phone_registrations_info_title',
    id: 'uidu.devise.phone_registrations_info_title',
  },
  phone_registrations_info_description: {
    defaultMessage: 'phone_registrations_info_description',
    id: 'uidu.devise.phone_registrations_info_description',
  },
  phone_registrations_password_title: {
    defaultMessage: 'phone_registrations_password_title',
    id: 'uidu.devise.phone_registrations_password_title',
  },
  phone_registrations_password_description: {
    defaultMessage: 'phone_registrations_password_description',
    id: 'uidu.devise.phone_registrations_password_description',
  },
  phone_registrations_phone_cta: {
    defaultMessage: 'Sign up',
    id: 'uidu.devise.phone_registrations_phone_cta',
  },
});

export default function DeviseForm({
  scope,
  children,
  signUp,
}: {
  scope: 'sessions' | 'registrations';
  children: (props: { phone: string }) => React.ReactNode;
  signUp: (data: any) => Promise<any>;
}) {
  // private recaptchaInstance = React.createRef();
  const form = useForm({});
  const location = useLocation();
  const match = useRouteMatch();

  const step = match.params?.step;

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
      <div tw="mb-4">
        <Link to={match.path}>
          <ArrowLeft tw="mr-2" size={18} />
          Indietro
        </Link>
      </div>
      <div tw="mb-4 text-center">
        <h3>
          <FormattedMessage
            {...messages[`phone_${scope}_${step || 'phone'}_title`]}
          />
        </h3>
        <p tw="mb-0">
          <FormattedMessage
            {...messages[`phone_${scope}_${step || 'phone'}_description`]}
          />
        </p>
      </div>
      <Form
        form={form}
        handleSubmit={signUp}
        footerRenderer={({ canSubmit, loading }) => [
          <div tw="flex justify-between">
            <FormSubmit
              appearance="primary"
              shouldFitContainer
              canSubmit={canSubmit}
              loading={loading}
            >
              <FormattedMessage
                {...messages[`phone_${scope}_${step || 'phone'}_cta`]}
              />
            </FormSubmit>
          </div>,
        ]}
      >
        {children({ phone })}
      </Form>
    </>
  );
}
