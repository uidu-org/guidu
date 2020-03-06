import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { DeviseProps } from '../types';
import PasswordRecovery from './PasswordRecovery';
import PasswordReset from './PasswordReset';
import Providers from './Providers';

export default function Devise({
  defaultView = 'sessions',
  routes,
  ...rest
}: DeviseProps) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={routes.passwords}
        render={routeProps => (
          <PasswordRecovery {...rest} routes={routes} {...routeProps} />
        )}
      />
      <Route
        exact
        path={`${routes.passwords}/edit`}
        render={routeProps => (
          <PasswordReset {...rest} routes={routes} {...routeProps} />
        )}
      />
      <Route
        // exact
        path={match.path}
        render={routeProps => (
          <Providers
            {...rest}
            {...routeProps}
            routes={routes}
            scope={defaultView}
          />
        )}
      />
    </Switch>
  );
}
