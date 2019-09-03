import Avatar from '@uidu/avatar';
import * as React from 'react';
import { FacebookProvider } from 'react-facebook';
import { IntlProvider } from 'react-intl';
import { HashRouter as Router, Route } from 'react-router-dom';
import Devise, { DeviseWrapper } from '../src';

export default function App() {
  const [identity, setIdentity] = React.useState(null);

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
                />
              </DeviseWrapper>
            )}
          />
        </Router>
      </FacebookProvider>
    </IntlProvider>
  );
}
