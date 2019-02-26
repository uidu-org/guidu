// @flow
import type { ComponentType, ElementConfig } from 'react';
import { GlobalItem, GlobalNav } from '@atlaskit/navigation-next';

type DefaultItemShape = {
  icon?: ComponentType<*>,
  label: string,
  section: 'primary' | 'secondary',
  rank: number,
  tooltip: string,
};

type ItemShape = {
  tooltip?: string,
  label?: string,
  onClick: () => void,
  icon?: ComponentType<*>,
};

type DropdownItem = {
  tooltip?: string,
  label?: string,
  icon?: ComponentType<*>,
  component?: ComponentType<*>,
  badge?: ComponentType<*>,
  href?: string,
};

export type DefaultConfigShape = {
  product: DefaultItemShape,
  starred: DefaultItemShape,
  search: DefaultItemShape,
  create: DefaultItemShape,
  notification: DefaultItemShape,
  appSwitcher: {
    section: 'primary' | 'secondary',
    rank: number,
  },
  help: DefaultItemShape,
  settings: DefaultItemShape,
  atlassianSwitcher: DefaultItemShape,
  profile: DefaultItemShape,
};

export type ProductConfigShape = {
  product: ?ItemShape,
  create: ?ItemShape,
  search: ?ItemShape,
  starred: ?ItemShape,
  notification: ?ItemShape,
  appSwitcher: ?{
    itemComponent: ComponentType<*>,
  },
  help: ?DropdownItem,
  settings: ?ItemShape,
  atlassianSwitcher: ?ItemShape,
  profile: ?DropdownItem,
};

type ExtractArrayType = <T>(T[]) => T;

type GlobalNavItem = $Call<
  ExtractArrayType,
  $PropertyType<ElementConfig<typeof GlobalNav>, 'primaryItems'>,
>;

export type NavItem = {
  ...$Exact<GlobalNavItem>,
  section: 'primary' | 'secondary',
  rank: number,
};

// The shape of the item data required by GlobalNav
export type GlobalNavItemData = {
  ...$Exact<ElementConfig<typeof GlobalItem>>,
  dropdownItems?: ComponentType<{}>,
  itemComponent?: ComponentType<{}>,
  badgeCount?: number,
};
