import Shell, { ShellBody, ShellContent, ShellMain } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { Activity, Bell, Grid, Home } from 'react-feather';
import { withRouter } from 'react-router-dom';
import Tabbar, { TabbarLink } from '../src';

class Basic extends PureComponent {
  render() {
    return (
      <Shell>
        <ShellContent>
          <ShellMain>
            <ShellBody className="bg-light" />
            <Tabbar>
              <TabbarLink exact to="/" activeClassName="text-primary">
                <Home size={18} />
                <small className="mt-1">Home</small>
              </TabbarLink>
              <TabbarLink exact activeClassName="text-primary" to="/apps/teams">
                <Activity size={18} />
                <small className="mt-1">Home</small>
              </TabbarLink>
              <TabbarLink exact activeClassName="text-primary" to="/apps/teams">
                <Grid size={18} />
                <small className="mt-1">Home</small>
              </TabbarLink>
              <TabbarLink exact activeClassName="text-primary" to="/apps/teams">
                <Bell size={18} />
                <small className="mt-1">Home</small>
              </TabbarLink>
            </Tabbar>
          </ShellMain>
        </ShellContent>
      </Shell>
    );
  }
}

export default withRouter(Basic);
