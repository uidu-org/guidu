import React, { PureComponent } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { DeviseWrapper, Passwordless } from '..';

export default class PasswordlessExample extends PureComponent {
  render() {
    return (
      <Router>
        <Route
          path="/"
          render={routeProps => (
            <DeviseWrapper>
              <Passwordless
                {...routeProps}
                routes={{
                  registrations: 'sign_up',
                  sessions: 'sign_in',
                  passwords: 'passwords',
                }}
                app={{
                  name: 'uidu',
                  icon:
                    'https://scontent.fmxp3-1.fna.fbcdn.net/v/t1.0-9/10355745_938423579521141_7227343713995220766_n.png?_nc_cat=105&_nc_ht=scontent.fmxp3-1.fna&oh=66654a015e27a67bd622f455ea95cb70&oe=5D53E472',
                }}
              />
            </DeviseWrapper>
          )}
        />
      </Router>
    );
  }
}
