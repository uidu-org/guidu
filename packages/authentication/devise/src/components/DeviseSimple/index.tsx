import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { DeviseProps } from '../../types';
import PasswordRecovery from '../PasswordRecovery';
import PasswordReset from '../PasswordReset';
import RegistrationsForm from './RegistrationsForm';
import SessionsForm from './SessionsForm';

export default class DeviseSimple extends Component<DeviseProps> {
  static defaultProps = {
    defaultView: 'sessions',
  };

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
          path={`${match.path}${routes.passwords}`}
          render={routeProps => (
            <PasswordRecovery {...this.props} {...routeProps} />
          )}
        />
        <Route
          exact
          path={`${match.path}${routes.passwords}/edit`}
          render={routeProps => (
            <PasswordReset {...this.props} {...routeProps} />
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
