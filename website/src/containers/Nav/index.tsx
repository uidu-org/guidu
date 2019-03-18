import * as React from 'react';
import { toClass } from 'recompose';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Link } from '../../components/WrappedLink';
import Navigation, {
  AkContainerTitle,
  presetThemes,
} from '@atlaskit/navigation';
import { borderRadius, colors } from '@atlaskit/theme';
import Tooltip from '@atlaskit/tooltip';

import SearchIcon from '@atlaskit/icon/glyph/search';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import DocumentationIcon from '@atlaskit/icon/glyph/overview';
import PatternsIcon from '@atlaskit/icon/glyph/issues';

import Groups from './Groups';
import GroupDrawer from './GroupDrawer';
import SearchDrawer from './SearchDrawer';
import { externalPackages as packages, docs, patterns } from '../../site';
import atlaskitLogo from '../../assets/atlaskit-logo-inverted.png';
import atlaskitLogoMonochrome from '../../assets/atlaskit-logo-monochrome.png';

export type State = {
  groupDrawerOpen: boolean;
  searchDrawerOpen: boolean;
  searchDrawerValue: string;
};

const IconWrapper = styled.div`
  align-items: center;
  background-color: ${p => p.color};
  border-radius: ${borderRadius}px;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 40px;
`;
const HeaderIcon = ({ icon: Icon, color, label }) => (
  <IconWrapper color={color}>
    <Icon label={label} primaryColor={colors.N0} />
  </IconWrapper>
);

const headers = {
  docs: {
    icon: DocumentationIcon,
    color: colors.P300,
    label: 'Documentation',
  },
  packages: {
    icon: PackagesIcon,
    color: colors.R300,
    label: 'Packages',
  },
  patterns: {
    icon: PatternsIcon,
    color: colors.G300,
    label: 'Patterns',
  },
};

export const AtlaskitIcon = ({ monochrome }: { monochrome?: boolean }) => (
  <img
    alt="Atlaskit logo"
    height="24"
    src={monochrome ? atlaskitLogoMonochrome : atlaskitLogo}
    style={{ display: 'block' }}
    width="24"
  />
);

export default class Nav extends React.Component<{}, State> {
  state = {
    groupDrawerOpen: false,
    searchDrawerOpen: false,
    searchDrawerValue: '',
  };

  openGroupDrawer = () => this.setState({ groupDrawerOpen: true });
  closeGroupDrawer = () => this.setState({ groupDrawerOpen: false });

  openSearchDrawer = () => this.setState({ searchDrawerOpen: true });
  closeSearchDrawer = () =>
    this.setState({
      searchDrawerOpen: false,
      searchDrawerValue: '',
    });
  updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      searchDrawerValue: e.target.value,
    });

  render() {
    const { groupDrawerOpen, searchDrawerOpen, searchDrawerValue } = this.state;

    return (
      <Switch>
        <Route
          render={({ location }) => {
            const containerNavAvailable = location.pathname !== '/';
            const theme = containerNavAvailable ? null : presetThemes.global;
            const headerKey = location.pathname.split('/').filter(p => p)[0];

            const header = headers[headerKey];
            const groups = (
              <Groups docs={docs} packages={packages} patterns={patterns} />
            );

            return (
              <Navigation
                isOpen={containerNavAvailable}
                containerTheme={theme}
                isCollapsible={!containerNavAvailable}
                isResizeable={false}
                globalPrimaryIcon={
                  <Tooltip content="Home" position="right">
                    <AtlaskitIcon />
                  </Tooltip>
                }
                globalCreateIcon={
                  <Tooltip content="Menu" position="right">
                    <MenuIcon label="Menu" />
                  </Tooltip>
                }
                globalPrimaryItemHref={'/'}
                globalSearchIcon={
                  <Tooltip content="Search" position="right">
                    <SearchIcon label="search" />
                  </Tooltip>
                }
                onSearchDrawerOpen={this.openSearchDrawer}
                onCreateDrawerOpen={this.openGroupDrawer}
                containerHeaderComponent={() =>
                  containerNavAvailable &&
                  header && (
                    <AkContainerTitle
                      icon={<HeaderIcon {...header} />}
                      text={header.label}
                      href={`/${headerKey}`}
                      linkComponent={toClass(
                        ({ href, children, className, onClick }) => (
                          <Link
                            onClick={onClick}
                            to={href}
                            className={className}
                          >
                            {children}
                          </Link>
                        ),
                      )}
                    />
                  )
                }
                drawers={[
                  <SearchDrawer
                    isOpen={searchDrawerOpen}
                    closeDrawer={this.closeSearchDrawer}
                    searchDrawerValue={searchDrawerValue}
                    updateSearchValue={this.updateSearchValue}
                    packages={packages}
                    key="searchDrawer"
                  />,
                  <GroupDrawer
                    key="groupDrawer"
                    isOpen={groupDrawerOpen}
                    closeDrawer={this.closeGroupDrawer}
                    pathname={location.pathname}
                  >
                    {groups}
                  </GroupDrawer>,
                ]}
              >
                {containerNavAvailable && groups}
              </Navigation>
            );
          }}
        />
      </Switch>
    );
  }
}
