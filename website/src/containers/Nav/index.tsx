import { ShellHeader } from '@uidu/shell';
import SideNavigation from '@uidu/side-navigation';
import Avatar from 'avataaars';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
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
                  <ShellHeader className="px-3 px-xl-4 py-3 h-auto">
                    <Avatar
                      style={{ width: '96px', height: '96px' }}
                      avatarStyle="Circle"
                      topType="WinterHat2"
                      accessoriesType="Round"
                      hatColor="Heather"
                      facialHairType="BeardMajestic"
                      facialHairColor="Blonde"
                      clotheType="ShirtScoopNeck"
                      clotheColor="Blue03"
                      eyeType="Happy"
                      eyebrowType="DefaultNatural"
                      mouthType="Default"
                      skinColor="Light"
                    />
                    <div className="ml-2">
                      <h5 className="m-0">GUIDÙ</h5>
                      <p className="mb-0 text-muted small">
                        A friend who helps you build awesome things
                      </p>
                    </div>
                  </ShellHeader>
                ),
              },
              {
                type: 'NavigationSection',
                items: [
                  {
                    type: 'InlineComponent',
                    component: () => (
                      <div className="px-3 px-xl-4 mb-4">
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

            return <SideNavigation schema={schema} />;
          }}
        />
      </Switch>
    );
  }
}
