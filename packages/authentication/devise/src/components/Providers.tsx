import React, { Fragment, PureComponent } from 'react';
import { Mail } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { alternativeScope } from '../utils';
import FacebookLoginButton from './Providers/FacebookLoginButton';
import GoogleLoginButton from './Providers/GoogleLoginButton';

export const messages = defineMessages({
  privacy_intro: {
    id: 'guidu.devise.privacy_intro',
    defaultMessage:
      "Per far funzionare uidu, registriamo i dati degli utenti e li condividiamo con alcuni provider. Registrandoti, accetti le Condizioni d'uso e confermi di aver letto e compreso la Privacy Policy.",
    description: '',
  },
  sessions_title: {
    id: 'guidu.devise.sessions_title',
    defaultMessage: 'Sign in',
    description: 'Allows user to perform an action again',
  },
  sessions_description: {
    id: 'guidu.devise.sessions_description',
    defaultMessage:
      "Accedi per visualizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te.",
    description: '',
  },

  sessions_with_provider: {
    id: 'guidu.devise.sessions_with_provider',
    defaultMessage: 'Sign in with {provider}',
    description: '',
  },
  registrations_title: {
    id: 'guidu.devise.registrations_title',
    defaultMessage: 'Sign up with your email',
    description: '',
  },
  registrations_description: {
    id: 'guidu.devise.registrations_title',
    defaultMessage:
      "Crea un account per personalizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te, e molto altro.",
    description: '',
  },
  registrations_with_provider: {
    id: 'guidu.devise.registrations_title',
    defaultMessage: 'Sign up with {provider}',
    description: '',
  },
});

export default class Providers extends PureComponent<any> {
  render() {
    const {
      routes,
      scope,
      authSignIn,
      onAuthSignIn,
      onAuthSignInError,
      history,
    } = this.props;
    const scopedRoutes = routes[scope];
    const oppositeRoutes = routes[alternativeScope(scope)];

    return (
      <div>
        <div className="text-center">
          <h3>
            <FormattedMessage {...messages[`${scope}_title`]} />
          </h3>
          <p>
            <FormattedMessage {...messages[`${scope}_description`]} />
          </p>
        </div>
        <FacebookLoginButton
          onCompleted={auth =>
            authSignIn(auth, 'facebook').then(response => {
              if (response.currentUser) {
                //
                return null;
              }
              return history.push(`${routes.registrations}/email`);
            })
          }
          onError={onAuthSignInError}
          label={
            <FormattedMessage
              {...messages[`${scope}_with_provider`]}
              values={{
                provider: <span className="font-weight-bold">Facebook</span>,
              }}
            />
          }
        />
        <GoogleLoginButton
          onCompleted={auth => authSignIn(auth, 'google').then(onAuthSignIn)}
          onError={onAuthSignInError}
          label={
            <FormattedMessage
              {...messages[`${scope}_with_provider`]}
              values={{
                provider: <span className="font-weight-bold">Google</span>,
              }}
            />
          }
        />
        <Link className="card card-body p-3 mb-3" to={`${scopedRoutes}/email`}>
          <div className="d-flex w-100 justify-content-start align-items-center">
            <Mail className="mr-2" size={18} />
            <div className="mr-auto">
              <h6 className="mb-0">
                <FormattedMessage
                  {...messages[`${scope}_with_provider`]}
                  values={{
                    provider: (
                      <span className="font-weight-bold">la tua email</span>
                    ),
                  }}
                />
              </h6>
            </div>
          </div>
        </Link>
        <Link
          to={oppositeRoutes}
          className="d-flex align-items-center justify-content-center mt-3 text-dark"
        >
          {scope === 'registrations' ? (
            <Fragment>
              Hai già un account?
              <span className="text-primary ml-1">Accedi.</span>
            </Fragment>
          ) : (
            <Fragment>
              Non hai un account?
              <span className="text-primary ml-1">Creane uno.</span>
            </Fragment>
          )}
        </Link>
        <p className="text-muted text-center mt-3 mb-0 small">
          <FormattedMessage {...messages.privacy_intro} />
        </p>
      </div>
    );
  }
}
