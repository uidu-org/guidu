import React, { Component } from 'react';
import classNames from 'classnames';

import {
  Switch,
  Route,
} from 'react-router-dom';

import CampaignsForm from './form';
import Audiences from '../audiences';

import Navbar from './navbar';

export default class PromoteCampaignEmail extends Component {
  render() {
    const {
      match,
      object,
      campaign,
    } = this.props;

    return (
      <div>
        <Navbar
          campaign={campaign}
          {...this.props}
        />
        <div className="container-fluid my-3">
          <Switch>
            <Route
              exact
              path={`${match.path}`}
              render={routeProps => (
                <p>Show campagna {campaign.name}</p>
              )}
            />
            <Route
              exact
              path={`${match.path}/edit`}
              render={routeProps => (
                <CampaignsForm
                  {...this.props}
                  {...routeProps}
                  object={object}
                  campaign={campaign}
                />
              )}
            />
            <Route
              exact
              path={`${match.path}/audiences`}
              render={routeProps => (
                <Audiences
                  campaign={campaign}
                />
              )}
            />
            <Route
              exact
              path={`${match.path}/template`}
              render={routeProps => <p>Ciao template</p>}
            />
            <Route
              exact
              path={`${match.path}/content`}
              render={routeProps => <p>Ciao content</p>}
            />
            <Route
              exact
              path={`${match.path}/review`}
              render={routeProps => <p>Ciao review</p>}
            />
            <Route
              exact
              path={`${match.path}/send`}
              render={routeProps => <p>Ciao send</p>}
            />
          </Switch>
        </div>
      </div>
    )
  }
}
