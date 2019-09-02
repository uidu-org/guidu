import { ShellBody } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import DeviseHeader from './DeviseHeader';
import RegistrationsForm from './PasswordlessRegistrationsForm';
import SessionsForm from './PasswordlessSessionsForm';

export default class Passwordless extends PureComponent {
  render() {
    const { brand, match, routes } = this.props;

    return (
      <>
        <ShellBody scrollable className="d-flex flex-column">
          <div
            className="container-fluid d-flex flex-column justify-content-center"
            style={{ flex: '1 1 auto' }}
          >
            <div className="row align-items-center justify-content-center my-4 my-sm-5">
              <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4">
                <DeviseHeader brand={brand} />
                <div className="card card-body">
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
                </div>
              </div>
            </div>
          </div>
        </ShellBody>
      </>
    );
  }
}
