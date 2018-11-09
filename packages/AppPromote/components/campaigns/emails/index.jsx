import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
} from 'react-router-dom';
import PromoteLayout from 'components/AppPromote/layout';
import Campaigns from './campaigns';
import Campaign from './campaigns/show';
import CampaignNavbar from './campaigns/navbar';

import CampaignsForm from './campaigns/form';

export default function PromoteCampaignEmail({
  match,
  object,
  campaigns,
  renderWithinLayout,
  ...otherProps
}) {
  return (
    <Switch>
      <Route
        exact
        path={`${match.path}`}
        render={routeProps => (
          renderWithinLayout(
            <PromoteLayout
              match={match}
            >
              <Campaigns
                {...otherProps}
                {...routeProps}
                object={object}
                campaigns={campaigns}
              />
            </PromoteLayout>,
          )
        )}
      />
      <Route
        exact
        path={`${match.path}/new`}
        render={routeProps => (
          <div>
            <CampaignNavbar
              campaign={{}}
              {...otherProps}
            />
            <div className="container-fluid my-3">
              <CampaignsForm
                {...otherProps}
                {...routeProps}
                object={object}
                campaign={{}}
              />
            </div>
          </div>
        )}
      />
      <Route
        // exact
        path={`${match.path}/:id`}
        render={routeProps => (
          <Campaign
            {...routeProps}
            campaign={campaigns.filter(c => c.id === parseInt(routeProps.match.params.id, 10))[0]}
          />
        )}
      />
    </Switch>
  );
}

PromoteCampaignEmail.propTypes = {
  match: PropTypes.shape(PropTypes.obj).isRequired,
  object: PropTypes.shape(PropTypes.obj).isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.object),
  renderWithinLayout: PropTypes.func.isRequired,
};

PromoteCampaignEmail.defaultProps = {
  campaigns: [],
};
