import * as React from 'react';
import { FacebookProvider } from 'react-facebook';
import { IntlProvider } from 'react-intl';
import { HashRouter as Router, Route } from 'react-router-dom';
import Devise from '../src';

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
              <Devise
                {...routeProps}
                currentIdentity={identity}
                checkExistence={email => {
                  if (email === 'andrea.vanini@uidu.org') {
                    return Promise.resolve({
                      data: { exists: true },
                    });
                  }
                  return Promise.resolve({
                    data: { exists: false },
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
                onAuthSignIn={response => console.log(response.currentUser)}
                onAuthSignInError={response => console.log(response)}
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
                onSignUp={console.log}
                recoverPassword={model => Promise.resolve(console.log(model))}
                onRecoverPassword={console.log}
                resetPassword={model => Promise.resolve(console.log(model))}
                onResetPassword={console.log}
                signIn={model => {
                  return new Promise((resolve, reject) => {
                    let wait = setTimeout(() => {
                      clearTimeout(wait);
                      console.log('signIn');
                      console.log(model);
                    }, 1500);
                  });
                }}
                onSignIn={console.log}
                app={{
                  name: 'uidu',
                  icon:
                    'https://scontent.fmxp3-1.fna.fbcdn.net/v/t1.0-9/10355745_938423579521141_7227343713995220766_n.png?_nc_cat=105&_nc_ht=scontent.fmxp3-1.fna&oh=66654a015e27a67bd622f455ea95cb70&oe=5D53E472',
                }}
                defaultView="sessions"
                routes={{
                  registrations: 'sign_up',
                  sessions: 'sign_in',
                  passwords: 'passwords',
                }}
              />
            )}
          />
        </Router>
      </FacebookProvider>
    </IntlProvider>
  );
}
