import Avatar from '@uidu/avatar';
import { ShellBody } from '@uidu/shell';
import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'swiper/dist/css/swiper.min.css';
import { DeviseProps } from '../types';
import DeviseForm from './DeviseForm';
import PasswordRecovery from './PasswordRecovery';
import PasswordReset from './PasswordReset';
import Providers from './Providers';

export default class Devise extends Component<DeviseProps> {
  static defaultProps = {
    defaultView: 'sessions',
  };

  render() {
    const {
      app: { name, icon },
      match,
      defaultView,
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
                        <Providers
                          {...this.props}
                          {...routeProps}
                          scope="sessions"
                        />
                      )}
                    />
                    <Route
                      exact
                      path={`${match.path}${routes.registrations}`}
                      render={routeProps => (
                        <Providers
                          {...this.props}
                          {...routeProps}
                          scope="registrations"
                        />
                      )}
                    />
                    <Route
                      path={`${match.path}${routes.sessions}/email/:step?`}
                      render={routeProps => (
                        <DeviseForm
                          {...this.props}
                          {...routeProps}
                          scope="sessions"
                        />
                      )}
                    />
                    <Route
                      path={`${match.path}${routes.registrations}/email/:step?`}
                      render={routeProps => (
                        <DeviseForm
                          {...this.props}
                          {...routeProps}
                          scope="registrations"
                        />
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
                        <Providers
                          {...this.props}
                          {...routeProps}
                          scope={defaultView}
                        />
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
