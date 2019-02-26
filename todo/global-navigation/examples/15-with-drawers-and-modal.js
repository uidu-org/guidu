// @flow

import React, { Fragment, Component } from 'react';
import AppSwitcher from '@atlaskit/app-switcher';
import Button from '@atlaskit/button';
import { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import { AkFieldRadioGroup as StatelessRadioGroup } from '@atlaskit/field-radio-group';
import AppSwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import { AtlassianIcon } from '@atlaskit/logo';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import {
  GlobalItem,
  LayoutManager,
  NavigationProvider,
} from '@atlaskit/navigation-next';
import { ToggleStateless } from '@atlaskit/toggle';
import Lorem from 'react-lorem-component';
import { mockEndpoints } from './helpers/mock-atlassian-switcher-endpoints';

import GlobalNavigation from '../src';

const DEFAULT_NOTIFICATION_COUNT = 5;

const appSwitcherData = {
  recentContainers: [
    {
      name: 'Recent container 1 without icon',
      url: 'https://www.atlassian.com/#1',
      iconUrl: '',
      type: 'confluence-space',
    },
    {
      name: 'Recent container 2',
      url: 'https://www.atlassian.com/#2',
      iconUrl:
        'data:image/png;base64,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',
      type: 'jira-project',
    },
    {
      name: 'Recent container 3',
      url: 'https://www.atlassian.com/#3',
      iconUrl:
        'data:image/png;base64,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',
      type: 'confluence-space',
    },
  ],
  linkedApplications: {
    configureLink: 'https://www.atlassian.com',
    apps: [
      {
        name: 'JIRA',
        url: 'https://www.atlassian.com/#4',
        product: 'jira',
      },
      {
        name: 'Confluence',
        url: 'https://www.atlassian.com/#5',
        product: 'confluence',
      },
    ],
    error: false,
  },
  isAnonymousUser: false,
  i18n: {
    home: 'Home',
    'site-admin': 'Site administration',
    apps: 'Apps',
    recent: 'Recent',
    configure: 'Configure',
    'container.confluence-space': 'Space',
    'container.jira-project': 'Project',
    'applinks.error': 'Unable to load linked applications.',
    'try.lozenge': 'try',
  },
};
const appSwitcherDropdownOptions = {
  position: 'right bottom',
};

const AppSwitcherComponent = itemProps => (
  <AppSwitcher
    {...appSwitcherData}
    isDropdownOpenInitially={false}
    dropdownOptions={appSwitcherDropdownOptions}
    trigger={isDropdownOpen => (
      <GlobalItem
        {...itemProps}
        icon={AppSwitcherIcon}
        isSelected={isDropdownOpen}
      />
    )}
  />
);

const DrawerContent = ({
  drawerTitle,
  drawerBody,
}: {
  drawerTitle: string,
  drawerBody: string,
}) => (
  <div>
    <h1>{drawerTitle}</h1>
    <div>{drawerBody}</div>
    <label htmlFor="textbox" css={{ display: 'block' }}>
      Type something in the textarea below and see if it is retained
    </label>
    <textarea input="textbox" type="text" rows="50" cols="50" />
  </div>
);

type State = {
  isCreateModalOpen: boolean,
  isSearchDrawerOpen: boolean,
};

type Props = {
  createItemOpens: 'drawer' | 'modal',
  notificationCount: number,
  onNotificationDrawerOpen: () => void,
  unmountOnExit: boolean,
};

const HelpDropdown = () => (
  <DropdownItemGroup title="Heading">
    <DropdownItem>Hello it with some really quite long text here.</DropdownItem>
    <DropdownItem>Some text 2</DropdownItem>
    <DropdownItem isDisabled>Some disabled text</DropdownItem>
    <DropdownItem>Some more text</DropdownItem>
    <DropdownItem href="//atlassian.com" target="_new">
      A link item
    </DropdownItem>
  </DropdownItemGroup>
);

class GlobalNavWithDrawers extends Component<Props, State> {
  state = {
    isCreateModalOpen: false,
    isSearchDrawerOpen: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboardShortcut);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboardShortcut);
  }

  handleKeyboardShortcut = e => {
    if (e.key === '\\') {
      if (this.state.isSearchDrawerOpen) return this.closeSearchDrawer();

      return this.openSearchDrawer();
    }
    return null;
  };

  openCreateModal = () => this.setState({ isCreateModalOpen: true });

  closeCreateModal = () => this.setState({ isCreateModalOpen: false });

  openSearchDrawer = () => this.setState({ isSearchDrawerOpen: true });

  closeSearchDrawer = () => {
    this.setState({ isSearchDrawerOpen: false });
  };

  secondaryAction = ({ target }: Object) => console.log(target.innerText);

  onCloseComplete = (node: HTMLElement) => console.log('onCloseComplete', node);

  renderCreateDrawerContents = () => (
    <DrawerContent
      drawerTitle="Create drawer"
      drawerBody="You can toggle between a search drawer and the search modal"
    />
  );

  renderSearchDrawerContents = () => (
    <DrawerContent
      drawerTitle="Controlled Search drawer"
      drawerBody="Can be controlled by passing the onSearchClick prop"
    />
  );

  renderStarredDrawerContents = () => (
    <DrawerContent
      drawerTitle="Starred drawer"
      drawerBody="Can be controlled by passing the onStarredClick prop"
    />
  );

  renderNotificationDrawerContents = () => (
    <DrawerContent
      drawerTitle="Notification drawer"
      drawerBody="Resets notification count in `onNotificationDrawerOpen` callback"
    />
  );

  renderSettingsDrawerContents = () => (
    <DrawerContent
      drawerTitle="Settings drawer"
      drawerBody="Can be controlled by passing the onSettingsClick prop"
    />
  );

  render() {
    const actions = [
      { text: 'Close', onClick: this.closeCreateModal },
      { text: 'Secondary Action', onClick: this.secondaryAction },
    ];

    const {
      createItemOpens,
      notificationCount,
      onNotificationDrawerOpen,
      unmountOnExit,
    } = this.props;

    return (
      <Fragment>
        <GlobalNavigation
          // Product
          productIcon={() => <AtlassianIcon label="Atlassian" size="medium" />}
          onProductClick={() => console.log('product clicked')}
          // Starred
          starredDrawerContents={this.renderStarredDrawerContents}
          onStarredDrawerCloseComplete={this.onCloseComplete}
          shouldStarredDrawerUnmountOnExit={unmountOnExit}
          // Create
          onCreateClick={
            createItemOpens === 'modal' ? this.openCreateModal : null
          }
          onCreateDrawerCloseComplete={this.onCloseComplete}
          createDrawerContents={this.renderCreateDrawerContents}
          shouldCreateDrawerUnmountOnExit={unmountOnExit}
          // Search
          onSearchClick={this.openSearchDrawer}
          searchTooltip="Search (\)"
          isSearchDrawerOpen={this.state.isSearchDrawerOpen}
          searchDrawerContents={this.renderSearchDrawerContents}
          onSearchDrawerClose={this.closeSearchDrawer}
          onSearchDrawerCloseComplete={this.onCloseComplete}
          shouldSearchDrawerUnmountOnExit={unmountOnExit}
          // Notifications
          notificationDrawerContents={this.renderNotificationDrawerContents}
          onNotificationDrawerOpen={onNotificationDrawerOpen}
          onNotificationDrawerCloseComplete={this.onCloseComplete}
          notificationCount={notificationCount}
          shouldNotificationDrawerUnmountOnExit={unmountOnExit}
          // App switcher
          appSwitcherComponent={AppSwitcherComponent}
          appSwitcherTooltip="Switch apps..."
          enableAtlassianSwitcher
          // Help
          helpItems={HelpDropdown}
          // Settings
          settingsDrawerContents={this.renderSettingsDrawerContents}
          onSettingsDrawerCloseComplete={this.onCloseComplete}
          shouldSettingsDrawerUnmountOnExit={unmountOnExit}
        />
        <ModalTransition>
          {this.state.isCreateModalOpen && (
            <Modal
              actions={actions}
              onClose={this.closeCreateModal}
              heading="Modal Title"
            >
              <Lorem count={2} />
            </Modal>
          )}
        </ModalTransition>
      </Fragment>
    );
  }
}

type NavState = {
  createItemOpens: 'drawer' | 'modal',
  notificationCount: number,
  shouldUnmountOnExit: boolean,
};

// Need two components because both have state
// eslint-disable-next-line react/no-multi-comp
export default class extends Component<{||}, NavState> {
  state = {
    createItemOpens: 'modal',
    notificationCount: DEFAULT_NOTIFICATION_COUNT,
    shouldUnmountOnExit: false,
  };

  componentDidMount() {
    mockEndpoints();
  }

  handleCreateChange = (e: *) => {
    this.setState({ createItemOpens: e.currentTarget.value });
  };

  toggleUnmountBehaviour = () => {
    this.setState(({ shouldUnmountOnExit: unmountOnExitValue }) => ({
      shouldUnmountOnExit: !unmountOnExitValue,
    }));
  };

  clearNotificationCount = () => this.setState({ notificationCount: 0 });

  resetNotificationCount = () =>
    this.setState({ notificationCount: DEFAULT_NOTIFICATION_COUNT });

  renderGlobalNavigation = () => {
    const {
      createItemOpens,
      notificationCount,
      shouldUnmountOnExit,
    } = this.state;
    return (
      <GlobalNavWithDrawers
        createItemOpens={createItemOpens}
        notificationCount={notificationCount}
        onNotificationDrawerOpen={this.clearNotificationCount}
        unmountOnExit={shouldUnmountOnExit}
      />
    );
  };

  render() {
    const {
      createItemOpens,
      notificationCount,
      shouldUnmountOnExit,
    } = this.state;
    return (
      <NavigationProvider>
        <LayoutManager
          globalNavigation={this.renderGlobalNavigation}
          productNavigation={() => null}
          containerNavigation={() => null}
        >
          <div css={{ padding: '32px 40px' }}>
            <div>
              <StatelessRadioGroup
                items={[
                  {
                    value: 'modal',
                    label: 'Modal',
                    isSelected: createItemOpens === 'modal',
                  },
                  {
                    value: 'drawer',
                    label: 'Drawer',
                    isSelected: createItemOpens === 'drawer',
                  },
                ]}
                label="Create item opens a:"
                onRadioChange={this.handleCreateChange}
              />
            </div>
            <div css={{ display: 'block', paddingTop: '1rem' }}>
              <ToggleStateless
                isChecked={!shouldUnmountOnExit}
                onChange={this.toggleUnmountBehaviour}
              />{' '}
              Retain drawer contents after closing the drawer.
            </div>
            <p>
              <Button
                isDisabled={notificationCount === DEFAULT_NOTIFICATION_COUNT}
                onClick={this.resetNotificationCount}
              >
                Reset notifications count
              </Button>
            </p>
          </div>
        </LayoutManager>
      </NavigationProvider>
    );
  }
}
