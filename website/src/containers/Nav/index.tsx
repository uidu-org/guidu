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
                  <ShellHeader tw="px-3 xl:px-4 py-3 h-auto">
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
                    <div tw="ml-2">
                      <h5 tw="m-0">GUIDÙ</h5>
                      <p tw="mb-0 text-gray-500 text-sm">
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
                      <div tw="px-3 md:px-5 mb-2">
                        <input
                          type="search"
                          tw="shadow-md mb-4 border border-gray-300 border-opacity-30 py-2.5 w-full rounded"
                          autoComplete="off"
                          placeholder="Cerca tra i contatti.."
                        />
                      </div>
                    ),
                  },
                  {
                    type: 'NavigationGroup',
                    items: defaultNavigations,
                    withMargin: true,
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
