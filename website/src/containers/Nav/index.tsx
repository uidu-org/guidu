import Navigation from '@uidu/navigation';
import { ShellHeader } from '@uidu/shell';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import atlaskitLogo from '../../assets/atlaskit-logo.png';
import { externalPackages as packages } from '../../site';
import * as fs from '../../utils/fs';
import defaultNavigations from './navigations/Default';
import { standardGroups } from './navigations/Packages';

export type State = {
  searchDrawerValue: string;
};

export default class Nav extends React.Component<{}, State> {
  state = {
    searchDrawerValue: '',
  };

  closeSearchDrawer = () =>
    this.setState({
      searchDrawerValue: '',
    });
  updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      searchDrawerValue: e.target.value,
    });

  render() {
    const { searchDrawerValue } = this.state;
    const dirs = fs.getDirectories(packages.children);

    return (
      <Switch>
        <Route
          render={({ location }) => {
            const schema = [
              {
                type: 'InlineComponent',
                component: () => (
                  <ShellHeader className="border-bottom px-3 px-xl-4">
                    <img
                      alt="Atlaskit logo"
                      className="mr-2 mr-xl-3"
                      src={atlaskitLogo}
                      style={{ display: 'block', width: 24 }}
                    />
                    <h5 className="m-0">GUIDU</h5>
                  </ShellHeader>
                ),
              },
              {
                type: 'NavigationSection',
                items: [
                  {
                    type: 'InlineComponent',
                    component: () => (
                      <div className="px-3 px-xl-4 my-4">
                        <input
                          type="search"
                          className="form-control shadow-none mb-4"
                          autoComplete="off"
                          placeholder="Cerca tra i contatti.."
                        />
                      </div>
                    ),
                  },
                  {
                    type: 'NavigationGroup',
                    items: defaultNavigations,
                  },

                  ...standardGroups(dirs, location.pathname),
                ],
              },
            ];

            return <Navigation schema={schema} />;
          }}
        />
      </Switch>
    );
  }
}
