import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'swiper/dist/css/swiper.min.css';
import { DeviseProps } from '../types';
import PasswordRecovery from './PasswordRecovery';
import PasswordReset from './PasswordReset';
import Providers from './Providers';

export default class Devise extends Component<DeviseProps> {
  static defaultProps = {
    defaultView: 'sessions',
  };

  render() {
    const { match, defaultView, routes } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={routes.passwords}
          render={routeProps => (
            <PasswordRecovery {...this.props} {...routeProps} />
          )}
        />
        <Route
          exact
          path={`${routes.passwords}/edit`}
          render={routeProps => (
            <PasswordReset {...this.props} {...routeProps} />
          )}
        />
        <Route
          // exact
          path={match.path}
          render={routeProps => (
            <Providers {...this.props} {...routeProps} scope={defaultView} />
          )}
        />
      </Switch>
    );
  }
}
