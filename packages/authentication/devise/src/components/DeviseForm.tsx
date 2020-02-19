import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import { Form, FormSubmit } from '@uidu/form';
import React, { PureComponent } from 'react';
import { ArrowLeft } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import Recaptcha from 'react-recaptcha';
import { Link } from 'react-router-dom';
import { userDataFromIdentity } from '../utils';

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
});

export default class DeviseForm extends PureComponent<any, any> {
  private recaptchaInstance = React.createRef();
  private form = React.createRef();

  handleSubmit = async () => {
    (this.recaptchaInstance.current as any).execute();
  };

  // executed once the captcha has been verified
  // can be used to post forms, redirect, etc.
  verifyCallback = captchaResponse => {
    const { signUp } = this.props;
    return signUp({
      ...(this.form.current as any).form.getModel(),
      'g-recaptcha-response': captchaResponse,
    });
  };

  render() {
    const {
      match: {
        params: { step },
      },
      scope,
      match,
      currentUser,
      currentIdentity,
    } = this.props;

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
          ref={this.form}
          handleSubmit={this.handleSubmit}
          footerRenderer={({ canSubmit, loading }) => [
            <div className="d-flex justify-content-between">
              <FormSubmit
                className="btn-primary btn-block"
                canSubmit={canSubmit}
                loading={loading}
                label={'utils.actions.sign_in'}
              />
            </div>,
          ]}
        >
          {currentIdentity && [
            <FieldText
              type="hidden"
              name="identity_ids"
              value={currentIdentity.id}
            />,
            <FieldText
              type="hidden"
              name="user[remote_avatar_url]"
              value={userDataFromIdentity(currentIdentity).avatar}
            />,
          ]}
          <FieldText
            type="email"
            label={
              currentIdentity && userDataFromIdentity(currentIdentity).email
                ? 'Conferma la tua email'
                : 'Inserisci la tua email'
            }
            name="user[email]"
            autoComplete="email"
            autoCorrect="off"
            value={
              currentUser
                ? currentUser.email
                : currentIdentity
                ? userDataFromIdentity(currentIdentity).email
                : ''
            }
            required
          />
          <FieldText
            type="text"
            label={
              currentIdentity ? 'Conferma il tuo nome' : 'Inserisci il tuo nome'
            }
            name="user[first_name]"
            autoComplete="given-name"
            value={
              currentIdentity
                ? userDataFromIdentity(currentIdentity).firstName
                : ''
            }
            required
            // autoFocus
          />
          <FieldText
            type="text"
            label={
              currentIdentity
                ? 'Conferma il tuo cognome'
                : 'Inserisci il tuo cognome'
            }
            name="user[last_name]"
            autoComplete="family-name"
            value={
              currentIdentity
                ? userDataFromIdentity(currentIdentity).lastName
                : ''
            }
            required
          />
          {!currentIdentity && (
            <div className="form-group">
              <FieldPassword
                measurePasswordStrength={false}
                autoComplete="current-password"
                label="Inserisci la tua password"
                name="user[password]"
                type="password"
                id="new-password"
                validations="minLength:8"
                required
              />
            </div>
          )}
          <div className="form-group">
            <Recaptcha
              ref={this.recaptchaInstance}
              sitekey="6LdLkqgUAAAAAPNT6KJn0Emp5bgJw3N9CQ-n27Dg"
              size="invisible"
              render="explicit"
              badge="inline"
              verifyCallback={this.verifyCallback}
            />
          </div>
          <p className="text-muted small">
            Per far funzionare uidu, registriamo i dati degli utenti e li
            condividiamo con alcuni provider. Registrandoti, accetti le
            Condizioni d'uso e confermi di aver letto e compreso la Privacy
            Policy.
          </p>
        </Form>
      </>
    );
  }
}
