import Avatar from '@uidu/avatar';
import { ShellBody } from '@uidu/shell';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'swiper/dist/css/swiper.min.css';
import { DeviseProps } from '../types';
import PasswordRecovery from './PasswordRecovery';
import PasswordReset from './PasswordReset';
import RegistrationsForm from './RegistrationsForm';
import SessionsForm from './SessionsForm';

export default class DeviseSimple extends Component<DeviseProps> {
  static defaultProps = {
    defaultView: 'sessions',
  };

  render() {
    const {
      app: { name, icon },
      match,
      routes,
    } = this.props;

    return (
      <Fragment>
        {/* <ShellHeader className="border-bottom">Test navbar</ShellHeader> */}
        <ShellBody scrollable className="d-flex flex-column">
          <div
            className="container-fluid d-flex flex-column justify-content-center"
            style={{ flex: '1 1 auto' }}
          >
            <div className="row align-items-center justify-content-center my-4 my-sm-5">
              <div className="col-sm-8 col-md-6 col-lg-5 col-xl-4">
                <div className="card card-body">
                  <div className="text-center mb-4">
                    <Avatar src={icon} size="large" />
                  </div>
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
                </div>
              </div>
            </div>
          </div>
        </ShellBody>
      </Fragment>
    );
  }
}
