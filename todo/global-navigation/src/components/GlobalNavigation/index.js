// @flow

import React, { Component, Fragment } from 'react';
import type { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { NotificationIndicator } from '@atlaskit/notification-indicator';
import { NotificationLogClient } from '@atlaskit/notification-log-client';
import { GlobalNav } from '@atlaskit/navigation-next';
import Drawer from '@atlaskit/drawer';
import AtlassianSwitcher from '@atlaskit/atlassian-switcher';
import {
  name as packageName,
  version as packageVersion,
} from '../../../package.json';
import generateDefaultConfig from '../../config/default-config';
import generateProductConfig from '../../config/product-config';
import ItemComponent from '../ItemComponent';
import ScreenTracker from '../ScreenTracker';
import { analyticsIdMap, fireDrawerDismissedEvents } from './analytics';
import NotificationDrawerContents from '../../platform-integration';

import type { NavItem } from '../../config/types';
import type { GlobalNavigationProps, DrawerName } from './types';

const noop = () => {};

const localStorage = typeof window === 'object' ? window.localStorage : {};

type GlobalNavigationState = {
  [any]: boolean, // Need an indexer property to appease flow for is${capitalisedDrawerName}Open
  isCreateDrawerOpen: boolean,
  isSearchDrawerOpen: boolean,
  isNotificationDrawerOpen: boolean,
  isStarredDrawerOpen: boolean,
  isSettingsDrawerOpen: boolean,
  isAtlassianSwitcherDrawerOpen: boolean,
  notificationCount: number,
};

type DrawerInstanceState = {
  isControlled: boolean,
};

export default class GlobalNavigation extends Component<
  GlobalNavigationProps,
  GlobalNavigationState,
> {
  drawers: {
    [DrawerName]: DrawerInstanceState,
  } = {
    search: {
      isControlled: false,
    },
    notification: {
      isControlled: false,
    },
    starred: {
      isControlled: false,
    },
    settings: {
      isControlled: false,
    },
    create: {
      isControlled: false,
    },
    atlassianSwitcher: {
      isControlled: false,
    },
  };
  isNotificationInbuilt = false;
  shouldRenderAtlassianSwitcher = false;

  static defaultProps = {
    enableAtlassianSwitcher: false,
    createDrawerWidth: 'wide',
    searchDrawerWidth: 'wide',
    notificationDrawerWidth: 'wide',
    starredDrawerWidth: 'wide',
    settingsDrawerWidth: 'wide',
  };

  constructor(props: GlobalNavigationProps) {
    super(props);

    this.state = {
      isCreateDrawerOpen: false,
      isSearchDrawerOpen: false,
      isNotificationDrawerOpen: false,
      isStarredDrawerOpen: false,
      isSettingsDrawerOpen: false,
      isAtlassianSwitcherDrawerOpen: false,
      notificationCount: 0,
    };

    Object.keys(this.drawers).forEach((drawer: DrawerName) => {
      this.updateDrawerControlledStatus(drawer, props);

      const capitalisedDrawerName = this.getCapitalisedDrawerName(drawer);

      if (
        props[`${drawer}DrawerContents`] &&
        !props[`on${capitalisedDrawerName}Close`]
      ) {
        /* eslint-disable no-console */
        console.warn(`You have provided an onClick handler for ${drawer}, but no close handler for the drawer.
        Please pass on${capitalisedDrawerName}Close prop to handle closing of the ${drawer} drawer.`);
        /* eslint-enable */
      }

      // Set it's initial state using a prop with the same name.
      this.state[`is${capitalisedDrawerName}Open`] =
        props[`is${capitalisedDrawerName}Open`];
    });

    const {
      cloudId,
      enableAtlassianSwitcher,
      fabricNotificationLogUrl,
      notificationDrawerContents,
      product,
    } = this.props;
    this.isNotificationInbuilt = !!(
      !notificationDrawerContents &&
      cloudId &&
      fabricNotificationLogUrl
    );
    this.shouldRenderAtlassianSwitcher =
      enableAtlassianSwitcher && cloudId && product;
  }

  componentDidUpdate(prevProps: GlobalNavigationProps) {
    Object.keys(this.drawers).forEach(drawerName => {
      this.updateDrawerControlledStatus(drawerName, this.props);

      const capitalisedDrawerName = this.getCapitalisedDrawerName(drawerName);
      // Do nothing if it's a controlled drawer
      if (this.drawers[drawerName].isControlled) {
        return;
      }

      if (
        prevProps[`is${capitalisedDrawerName}Open`] !==
        this.props[`is${capitalisedDrawerName}Open`]
      ) {
        // Update the state based on the prop
        this.setState({
          [`is${capitalisedDrawerName}Open`]: this.props[
            `is${capitalisedDrawerName}Open`
          ],
        });
      }
    });

    const {
      cloudId,
      enableAtlassianSwitcher,
      fabricNotificationLogUrl,
      notificationDrawerContents,
      product,
    } = this.props;
    this.isNotificationInbuilt = !!(
      !notificationDrawerContents &&
      cloudId &&
      fabricNotificationLogUrl
    );
    this.shouldRenderAtlassianSwitcher =
      enableAtlassianSwitcher && cloudId && product;
  }

  onCountUpdating = (
    param: { visibilityChangesSinceTimer: number } = {
      visibilityChangesSinceTimer: 0,
    },
  ) => {
    if (
      !this.state.notificationCount ||
      param.visibilityChangesSinceTimer <= 1
    ) {
      // fetch the notificationCount
      return {};
    }

    // skip fetch, refresh from local storage if newer
    const cachedCount = parseInt(this.getLocalStorageCount(), 10);
    const result = {};
    if (cachedCount && cachedCount !== this.state.notificationCount) {
      result.countOverride = cachedCount;
    } else {
      result.skip = true;
    }
    return result;
  };

  onCountUpdated = (param: { newCount: number } = { newCount: 0 }) => {
    this.updateLocalStorageCount(param.newCount);
    this.setState({
      notificationCount: param.newCount,
    });
  };

  getLocalStorageCount = () => {
    try {
      return localStorage.getItem('notificationBadgeCountCache');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    return null;
  };

  updateLocalStorageCount = (newCount: number) => {
    try {
      localStorage.setItem('notificationBadgeCountCache', newCount);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  updateDrawerControlledStatus = (
    drawerName: DrawerName,
    props: GlobalNavigationProps,
  ) => {
    const capitalisedDrawerName = this.getCapitalisedDrawerName(drawerName);

    if (props[`on${capitalisedDrawerName.replace('Drawer', '')}Click`]) {
      this.drawers[drawerName].isControlled = false;
    } else {
      // If a drawer doesn't have an onClick handler, mark it as a controlled drawer.
      this.drawers[drawerName].isControlled = true;
    }
  };

  getCapitalisedDrawerName = (drawerName: DrawerName) => {
    return `${drawerName[0].toUpperCase()}${drawerName.slice(1)}Drawer`;
  };

  openDrawer = (drawerName: DrawerName) => () => {
    const capitalisedDrawerName = this.getCapitalisedDrawerName(drawerName);
    let onOpenCallback = noop;

    if (typeof this.props[`on${capitalisedDrawerName}Open`] === 'function') {
      onOpenCallback = this.props[`on${capitalisedDrawerName}Open`];
    }

    if (drawerName === 'notification' && this.isNotificationInbuilt) {
      this.onCountUpdated({ newCount: 0 });
    }

    // Update the state only if it's a controlled drawer.
    // componentDidMount takes care of the uncontrolled drawers
    if (this.drawers[drawerName].isControlled) {
      this.setState(
        {
          [`is${capitalisedDrawerName}Open`]: true,
        },
        onOpenCallback,
      );
    } else {
      // invoke callback in both cases
      onOpenCallback();
    }
  };

  closeDrawer = (drawerName: DrawerName) => (
    event: SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    const capitalisedDrawerName = this.getCapitalisedDrawerName(drawerName);
    let onCloseCallback = noop;

    if (typeof this.props[`on${capitalisedDrawerName}Close`] === 'function') {
      onCloseCallback = this.props[`on${capitalisedDrawerName}Close`];
    }

    fireDrawerDismissedEvents(drawerName, analyticsEvent);

    // Update the state only if it's a controlled drawer.
    // componentDidMount takes care of the uncontrolled drawers
    if (this.drawers[drawerName].isControlled) {
      this.setState(
        {
          [`is${capitalisedDrawerName}Open`]: false,
        },
        onCloseCallback,
      );
    } else {
      // invoke callback in both cases
      onCloseCallback();
    }
  };

  renderNotificationBadge = () => {
    if (this.state.isNotificationDrawerOpen) {
      // Unmount the badge when the drawer is open
      // So that it can remount with the latest badgeCount when the drawer closes.
      return null;
    }

    const { cloudId, fabricNotificationLogUrl } = this.props;
    const refreshRate = this.state.notificationCount ? 180000 : 60000;

    return (
      <NotificationIndicator
        notificationLogProvider={
          new NotificationLogClient(fabricNotificationLogUrl, cloudId)
        }
        refreshRate={refreshRate}
        onCountUpdated={this.onCountUpdated}
        onCountUpdating={this.onCountUpdating}
      />
    );
  };

  renderNotificationDrawerContents = () => {
    const { locale, product } = this.props;

    return <NotificationDrawerContents product={product} locale={locale} />;
  };

  constructNavItems = () => {
    const productConfig = generateProductConfig(
      this.props,
      this.openDrawer,
      this.isNotificationInbuilt,
    );
    const defaultConfig = generateDefaultConfig();
    const badge = this.renderNotificationBadge;
    const { notificationCount: badgeCount } = this.isNotificationInbuilt
      ? this.state
      : this.props;

    const navItems: NavItem[] = Object.keys(productConfig).map(item => ({
      ...(productConfig[item]
        ? {
            ...(item === 'notification' && this.isNotificationInbuilt
              ? { id: 'notifications', badge }
              : {}),
            ...defaultConfig[item],
            ...productConfig[item],
            ...(item === 'notification'
              ? { id: 'notifications', badgeCount }
              : {}),
          }
        : null),
    }));

    return {
      primaryItems: navItems
        .filter(({ section }) => section === 'primary')
        .sort(({ rank: rank1 }, { rank: rank2 }) => rank1 - rank2)
        .map(navItem => {
          const { section, rank, ...props } = navItem;
          return props;
        }),
      secondaryItems: navItems
        .filter(({ section }) => section === 'secondary')
        .sort(({ rank: rank1 }, { rank: rank2 }) => rank1 - rank2)
        .map(navItem => {
          const { section, rank, ...props } = navItem;
          return props;
        }),
    };
  };

  triggerXFlow = (...triggerXFlowProps: any) => {
    const { triggerXFlow } = this.props;
    this.setState({
      isAtlassianSwitcherDrawerOpen: false,
    });
    if (triggerXFlow) {
      triggerXFlow(...triggerXFlowProps);
    }
  };

  renderAtlassianSwitcherDrawerContents = () => {
    const { product, cloudId } = this.props;
    return (
      <AtlassianSwitcher
        product={product}
        cloudId={cloudId}
        triggerXFlow={this.triggerXFlow}
      />
    );
  };

  getDrawerContents = (drawerName: DrawerName) => {
    switch (drawerName) {
      case 'atlassianSwitcher':
        return this.shouldRenderAtlassianSwitcher
          ? this.renderAtlassianSwitcherDrawerContents
          : null;
      case 'notification':
        return this.isNotificationInbuilt
          ? this.renderNotificationDrawerContents
          : this.props.notificationDrawerContents;
      default:
        return this.props[`${drawerName}DrawerContents`];
    }
  };

  render() {
    // TODO: Look into memoizing this to avoid memory bloat
    const { primaryItems, secondaryItems } = this.constructNavItems();

    return (
      <NavigationAnalyticsContext
        data={{
          packageName,
          packageVersion,
          componentName: 'globalNavigation',
        }}
      >
        <Fragment>
          <GlobalNav
            itemComponent={ItemComponent}
            primaryItems={primaryItems}
            secondaryItems={secondaryItems}
          />
          {Object.keys(this.drawers).map(drawerName => {
            const capitalisedDrawerName = this.getCapitalisedDrawerName(
              drawerName,
            );
            const shouldUnmountOnExit = this.props[
              `should${capitalisedDrawerName}UnmountOnExit`
            ];

            const DrawerContents = this.getDrawerContents(drawerName);

            if (!DrawerContents) {
              return null;
            }

            const onCloseComplete = this.props[
              `on${capitalisedDrawerName}CloseComplete`
            ];

            return (
              <Drawer
                key={drawerName}
                isOpen={this.state[`is${capitalisedDrawerName}Open`]}
                onClose={this.closeDrawer(drawerName)}
                onCloseComplete={onCloseComplete}
                shouldUnmountOnExit={shouldUnmountOnExit}
                width={
                  drawerName === 'atlassianSwitcher'
                    ? 'narrow'
                    : this.props[`${drawerName}DrawerWidth`]
                }
              >
                <ScreenTracker
                  name={analyticsIdMap[drawerName]}
                  isVisible={this.state[`is${capitalisedDrawerName}Open`]}
                />
                <DrawerContents />
              </Drawer>
            );
          })}
        </Fragment>
      </NavigationAnalyticsContext>
    );
  }
}
