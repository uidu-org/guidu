import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Home, Activity, Bell } from 'react-feather';

import Tabbar, { TabbarLink } from '../src';

class Basic extends PureComponent {
  render() {
    return (
      <Tabbar>
        <TabbarLink exact to="/" activeClassName="text-primary">
          <Home size={18} />
        </TabbarLink>
        <TabbarLink exact activeClassName="text-primary" to="/apps/teams">
          <Activity size={18} />
        </TabbarLink>
        <TabbarLink exact activeClassName="text-primary" to="/apps/teams">
          <Grid size={18} />
        </TabbarLink>
        <TabbarLink exact activeClassName="text-primary" to="/apps/teams">
          <Bell size={18} />
        </TabbarLink>
      </Tabbar>
    );
  }
}

export default withRouter(Basic);
