// @flow

import React, { type StatelessFunctionalComponent } from 'react';
import QuestionIcon from '@atlaskit/icon/glyph/question-circle';
import Badge from '@atlaskit/badge';
import Avatar from '@atlaskit/avatar';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import type {
  GlobalNavigationProps,
  DrawerName,
} from '../components/GlobalNavigation/types';
import type { ProductConfigShape } from './types';

const MAX_NOTIFICATIONS_COUNT = 9;
const isNotEmpty = obj => {
  const values = Object.values(obj);
  return !!(
    values.length && values.reduce((acc, curr) => acc || !!curr, false)
  );
};

const generateAvatar = profileIconUrl => {
  const GeneratedAvatar = ({
    className,
    onClick,
  }: {
    className: string,
    onClick: () => void,
  }) => (
    <span className={className}>
      <Avatar
        borderColor="transparent"
        src={profileIconUrl}
        isActive={false}
        isHover={false}
        size="small"
        onClick={onClick}
      />
    </span>
  );
  return GeneratedAvatar;
};
type OtherConfig = {
  href?: string,
  badge?: ?StatelessFunctionalComponent<*>,
};

function configFactory(
  onClick: ?() => void,
  tooltip,
  otherConfig: OtherConfig = {},
) {
  const { href } = otherConfig;
  const shouldNotRenderItem = !onClick && !href;

  if (shouldNotRenderItem && (tooltip || isNotEmpty(otherConfig))) {
    // eslint-disable-next-line no-console
    console.warn(
      `One of the items in the Global Navigation is missing an onClick (or an href in case of the productIcon). This item will not be rendered in Global Navigation.`,
    );
  }

  if (shouldNotRenderItem) return null;

  return {
    ...(href ? { href } : null),
    ...(onClick ? { onClick } : null),
    ...(tooltip ? { tooltip, label: tooltip } : null),
    ...otherConfig,
  };
}

function helpConfigFactory(items, tooltip, otherConfig = {}) {
  if (!items && (tooltip || isNotEmpty(otherConfig))) {
    // eslint-disable-next-line no-console
    console.warn(
      'You have provided some prop(s) for help, but not helpItems. Help will not be rendered in Global Navigation',
    );
  }

  if (!items) return null;

  return {
    icon: QuestionIcon,
    dropdownItems: items,
    ...(tooltip ? { tooltip, label: tooltip } : null),
    ...otherConfig,
  };
}

function profileConfigFactory(
  items,
  tooltip,
  href,
  profileIconUrl,
  otherConfig = {},
) {
  const shouldNotRenderProfile = !items && !href;
  if (shouldNotRenderProfile && (tooltip || isNotEmpty(otherConfig))) {
    // eslint-disable-next-line no-console
    console.warn(
      'You provided some prop(s) for profile, but not profileItems or loginHref. Profile will not be rendered in Global Navigation',
    );
  }

  if (shouldNotRenderProfile) return null;

  if (items && href) {
    // eslint-disable-next-line no-console
    console.warn(
      'You have provided both loginHref and profileItems. loginUrl prop will be ignored by Global Navigation',
    );
  }

  const profileComponent = items
    ? { icon: generateAvatar(profileIconUrl), dropdownItems: items }
    : { icon: SignInIcon, href };

  return {
    ...profileComponent,
    ...(tooltip ? { tooltip, label: tooltip } : null),
    ...otherConfig,
  };
}

function notificationBadge(badgeCount) {
  return {
    badge: badgeCount
      ? () => (
          <Badge
            max={MAX_NOTIFICATIONS_COUNT}
            appearance="important"
            value={badgeCount}
          />
        )
      : null,
    badgeCount,
  };
}

function notificationConfigFactory(
  notificationTooltip,
  badgeCount,
  notificationDrawerContents,
  onNotificationClick,
  isNotificationInbuilt,
  openDrawer,
) {
  const notificationOnClickHandler = () => {
    if (onNotificationClick) {
      onNotificationClick();
    }
    openDrawer();
  };
  return isNotificationInbuilt
    ? configFactory(notificationOnClickHandler, notificationTooltip, {
        badgeCount,
      })
    : configFactory(
        onNotificationClick || (notificationDrawerContents && openDrawer),
        notificationTooltip,
        notificationBadge(badgeCount),
      );
}

export default function generateProductConfig(
  props: GlobalNavigationProps,
  openDrawer: DrawerName => () => void,
  isNotificationInbuilt: boolean,
): ProductConfigShape {
  const {
    product,
    cloudId,

    onProductClick,
    productTooltip,
    productIcon,
    productHref,

    onCreateClick,
    createTooltip,
    createDrawerContents,

    enableAtlassianSwitcher,

    searchTooltip,
    onSearchClick,
    searchDrawerContents,

    onStarredClick,
    starredTooltip,
    starredDrawerContents,

    notificationTooltip,
    notificationCount,
    notificationDrawerContents,
    onNotificationClick,

    appSwitcherComponent,
    appSwitcherTooltip,

    helpItems,
    helpTooltip,

    onSettingsClick,
    settingsTooltip,
    settingsDrawerContents,

    profileItems,
    profileTooltip,
    loginHref,
    profileIconUrl,
  } = props;

  const shouldRenderAtlassianSwitcher =
    enableAtlassianSwitcher && cloudId && product;

  if (enableAtlassianSwitcher && !shouldRenderAtlassianSwitcher) {
    console.warn(
      'When using the enableAtlassianSwitcher prop, be sure to send the cloudId and product props. Falling back to the legacy app-switcher',
    );
  }

  return {
    product: configFactory(onProductClick, productTooltip, {
      icon: productIcon,
      href: productHref,
    }),
    create: configFactory(
      onCreateClick || (createDrawerContents && openDrawer('create')),
      createTooltip,
    ),
    search: configFactory(
      onSearchClick || (searchDrawerContents && openDrawer('search')),
      searchTooltip,
    ),
    starred: configFactory(
      onStarredClick || (starredDrawerContents && openDrawer('starred')),
      starredTooltip,
    ),
    settings: configFactory(
      onSettingsClick || (settingsDrawerContents && openDrawer('settings')),
      settingsTooltip,
    ),
    atlassianSwitcher: shouldRenderAtlassianSwitcher
      ? configFactory(openDrawer('atlassianSwitcher'))
      : null,

    notification: notificationConfigFactory(
      notificationTooltip,
      notificationCount,
      notificationDrawerContents,
      onNotificationClick,
      isNotificationInbuilt,
      openDrawer('notification'),
    ),
    help: helpConfigFactory(helpItems, helpTooltip),
    profile: profileConfigFactory(
      profileItems,
      profileTooltip,
      loginHref,
      profileIconUrl,
    ),
    appSwitcher:
      appSwitcherComponent && !shouldRenderAtlassianSwitcher
        ? {
            itemComponent: appSwitcherComponent,
            label: appSwitcherTooltip,
            tooltip: appSwitcherTooltip,
          }
        : null,
  };
}
