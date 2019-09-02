import FieldText from '@uidu/field-text';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { HashRouter as Router, Route } from 'react-router-dom';
import { DeviseSimple } from '../src';

export default function App() {
  return (
    <IntlProvider
      locale="en"
      messages={{
        'guidu.devise.email_registrations_email_title': 'Funziona?',
      }}
    >
      <Router>
        <Route
          path="/"
          render={routeProps => (
            <DeviseSimple
              {...routeProps}
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
              additionalInfo={
                <React.Fragment>
                  <FieldText
                    type="text"
                    label="First name"
                    name="user[first_name]"
                    autoComplete="given-name"
                    required
                  />
                  <FieldText
                    type="text"
                    label="Last name"
                    name="user[last_name]"
                    autoComplete="family-name"
                    required
                  />
                </React.Fragment>
              }
            />
          )}
        />
      </Router>
    </IntlProvider>
  );
}
