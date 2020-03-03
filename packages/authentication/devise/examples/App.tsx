import Avatar from '@uidu/avatar';
import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import * as React from 'react';
import { FacebookProvider } from 'react-facebook';
import { IntlProvider } from 'react-intl';
import { HashRouter as Router, Route } from 'react-router-dom';
import Devise, { DeviseWrapper, userDataFromIdentity } from '../src';

export default function App() {
  const [identity, setIdentity] = React.useState(null);
  const currentUser = null;

  return (
    <IntlProvider
      locale="en"
      messages={{
        'guidu.devise.email_registrations_email_title': 'Funziona?',
      }}
    >
      <FacebookProvider appId="1490192927662498">
        <Router>
          <Route
            path="/"
            render={routeProps => (
              <DeviseWrapper
                header={
                  <div className="d-flex justify-content-center w-100 mb-4">
                    <Avatar
                      src="https://scontent.fmxp3-1.fna.fbcdn.net/v/t1.0-9/10355745_938423579521141_7227343713995220766_n.png?_nc_cat=105&_nc_ht=scontent.fmxp3-1.fna&oh=66654a015e27a67bd622f455ea95cb70&oe=5D53E472"
                      size="large"
                    />
                  </div>
                }
                footer={
                  <ul className="nav mt-2 small mx-n3">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        href="#"
                        role="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Italiano
                      </a>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                          Separated link
                        </a>
                      </div>
                    </li>
                    <li className="nav-item ml-auto">
                      <a className="nav-link" href="#">
                        Guida
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Privacy
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Termini
                      </a>
                    </li>
                  </ul>
                }
              >
                <Devise
                  currentIdentity={identity}
                  checkExistence={email => {
                    return new Promise((resolve, reject) => {
                      let wait = setTimeout(() => {
                        if (email === 'andrea.vanini@uidu.org') {
                          return resolve({
                            data: { exists: true },
                          });
                        }
                        return resolve({
                          data: { exists: false },
                        });
                      }, 400);
                    });
                  }}
                  authSignIn={(auth, provider) => {
                    return new Promise((resolve, reject) => {
                      let wait = setTimeout(() => {
                        clearTimeout(wait);
                        setIdentity({
                          currentUser: null,
                          data: {
                            ...auth,
                          },
                          provider,
                        });
                        resolve('Promise B win!');
                      }, 400);
                    });
                  }}
                  signUp={model => {
                    // if needed use recaptcha here
                    return new Promise((resolve, reject) => {
                      let wait = setTimeout(() => {
                        clearTimeout(wait);
                        console.log('signUp');
                        console.log(model);
                        resolve('Promise B win!');
                      }, 400);
                    });
                  }}
                  recoverPassword={model => Promise.resolve(console.log(model))}
                  resetPassword={model => Promise.resolve(console.log(model))}
                  signIn={model => {
                    return new Promise((resolve, reject) => {
                      let wait = setTimeout(() => {
                        clearTimeout(wait);
                        console.log('signIn');
                        console.log(model);
                      }, 1500);
                    });
                  }}
                  defaultView="sessions"
                  routes={{
                    registrations: '/sign_up',
                    sessions: '/sign_in',
                    passwords: '/passwords',
                  }}
                  {...routeProps}
                >
                  <>
                    {identity && (
                      <>
                        <FieldText
                          type="hidden"
                          name="identity_ids"
                          value={identity.id}
                        />
                        <FieldText
                          type="hidden"
                          name="user[remote_avatar_url]"
                          value={userDataFromIdentity(identity).avatar}
                        />
                      </>
                    )}
                    <FieldText
                      type="email"
                      label={
                        identity && userDataFromIdentity(identity).email
                          ? 'Conferma la tua email'
                          : 'Inserisci la tua email'
                      }
                      name="user[email]"
                      autoComplete="email"
                      autoCorrect="off"
                      value={
                        currentUser
                          ? currentUser.email
                          : identity
                          ? userDataFromIdentity(identity).email
                          : ''
                      }
                      required
                    />
                    <FieldText
                      type="text"
                      label={
                        identity
                          ? 'Conferma il tuo nome'
                          : 'Inserisci il tuo nome'
                      }
                      name="user[first_name]"
                      autoComplete="given-name"
                      value={
                        identity ? userDataFromIdentity(identity).firstName : ''
                      }
                      required
                      // autoFocus
                    />
                    <FieldText
                      type="text"
                      label={
                        identity
                          ? 'Conferma il tuo cognome'
                          : 'Inserisci il tuo cognome'
                      }
                      name="user[last_name]"
                      autoComplete="family-name"
                      value={
                        identity ? userDataFromIdentity(identity).lastName : ''
                      }
                      required
                    />
                    {!identity && (
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
                    <p className="text-muted small">
                      Per far funzionare uidu, registriamo i dati degli utenti e
                      li condividiamo con alcuni provider. Registrandoti,
                      accetti le Condizioni d'uso e confermi di aver letto e
                      compreso la Privacy Policy.
                    </p>
                  </>
                </Devise>
              </DeviseWrapper>
            )}
          />
        </Router>
      </FacebookProvider>
    </IntlProvider>
  );
}
