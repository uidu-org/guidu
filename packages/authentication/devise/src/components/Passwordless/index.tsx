import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistrationsForm from './PasswordlessRegistrationsForm';
import SessionsForm from './PasswordlessSessionsForm';

export default class Passwordless extends PureComponent<any> {
  render() {
    const { match, routes } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={`${match.path}${routes.sessions}`}
          render={routeProps => (
            <SessionsForm {...this.props} {...routeProps} />
          )}
        />
        <Route
          exact
          path={`${match.path}${routes.registrations}`}
          render={routeProps => (
            <RegistrationsForm {...this.props} {...routeProps} />
          )}
        />
        <Route
          exact
          path={match.path}
          render={routeProps => (
            <SessionsForm {...this.props} {...routeProps} />
          )}
        />
      </Switch>
    );
  }
}
