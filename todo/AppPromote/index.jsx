import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PromoteLayout from './layout';
import PromoteDashboard from './dashboard';

import Share from './components/share';
import Widgets from './components/widgets';

import PromoteCampaignEmails from './components/campaigns/emails';
import PromoteCampaignMessages from './components/campaigns/messages';

export default function Promote({ renderWithinLayout, ...otherProps }) {
  return (
    <Switch>
      <Route
        exact
        path={`${otherProps.match.url}/`}
        render={({ match }) =>
          renderWithinLayout(
            <PromoteLayout match={match}>
              <PromoteDashboard {...otherProps} match={match} />
            </PromoteLayout>,
          )
        }
      />
      <Route
        path={`${otherProps.match.url}/sms`}
        render={({ match }) => (
          <PromoteCampaignMessages
            {...otherProps}
            renderWithinLayout={renderWithinLayout}
            match={match}
          />
        )}
      />
      <Route
        path={`${otherProps.match.url}/emails`}
        render={({ match }) => (
          <PromoteCampaignEmails
            {...otherProps}
            renderWithinLayout={renderWithinLayout}
            match={match}
          />
        )}
      />
      <Route
        path={`${otherProps.match.url}/share`}
        render={({ match }) =>
          renderWithinLayout(
            <PromoteLayout match={match}>
              <Share {...otherProps} />
            </PromoteLayout>,
          )
        }
      />
      <Route
        path={`${otherProps.match.url}/widgets`}
        render={({ match }) =>
          renderWithinLayout(
            <PromoteLayout match={match}>
              <Widgets
                renderWithinLayout={renderWithinLayout}
                {...otherProps}
              />
            </PromoteLayout>,
          )
        }
      />
    </Switch>
  );
}

Promote.propTypes = {
  renderWithinLayout: PropTypes.func.isRequired,
};
