import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { DeviseProps } from '../../types';
import PasswordRecovery from '../PasswordRecovery';
import PasswordReset from '../PasswordReset';
import Providers from './Providers';

export default function DevisePhone({
  defaultView = 'sessions',
  routes,
  ...rest
}: DeviseProps) {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={routes.passwords}>
        <PasswordRecovery {...rest} routes={routes} />
      </Route>
      <Route exact path={`${routes.passwords}/edit`}>
        <PasswordReset {...rest} routes={routes} />
      </Route>
      <Route
        // exact
        path={match.path}
      >
        <Providers {...rest} routes={routes} scope={defaultView} />
      </Route>
    </Switch>
  );
}
