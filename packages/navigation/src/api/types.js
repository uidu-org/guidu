// @flow

import type { ComponentType } from 'react';

export type ItemArgs = {
  actionAfter?: string,
  goTo?: string,
  icon?: ComponentType<{
    isActive: boolean,
    isHover: boolean,
    isSelected: boolean,
    spacing: 'compact' | 'default',
  }>,
  iconName?: string,
  id: string,
  isLoading?: boolean,
  isSelected?: boolean,
  lozenge?: string,
  onClick?: (SyntheticEvent<any>) => void,
  route?: string,
  target?: string,
  text?: string,
  type: string,
  url?: string,
};

export type GroupArgs = {
  id: string,
  items: View[],
  nestedGroupKey?: string,
  parentId?: string,
  type: string,
};

export type ViewItem = ItemArgs | GroupArgs;

export type ViewKey = string;

export type View = ViewItem[];

export type ViewResolver = () => View;

export type Reducer = (View, ViewKey) => View;

export type ViewStateState = {|
  activeView: ViewKey | null,
  data: View | null,
  isLoading: boolean,
  nextView: ViewKey | null,
|};

export type ComponentTypesMap = { [string]: ComponentType<any> };

export type ViewStateOptions = {|
  activeView?: ViewKey | null,
  reducers?: { [ViewKey]: Reducer[] },
  views?: { [ViewKey]: ViewResolver },
  debug?: boolean,
|};
