// @flow

import type { ComponentType } from 'react';

type ViewItemArgs = {
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
  type: ComponentType<*> | string,
  url?: string,
};

type ViewGroupArgs = {
  id: string,
  items: ViewData,
  nestedGroupKey?: string,
  parentId?: string,
  type: ComponentType<*> | string,
};

export type ViewData = Array<ViewItemArgs | ViewGroupArgs>;
export type ViewID = string;
export type ViewLayer = 'product' | 'container';
type GetItemsSignature = () => Promise<ViewData> | ViewData;

export type View = {
  id: ViewID,
  type: ViewLayer,
  getItems: GetItemsSignature,
  /** Any data here is added to navigation context under the attributes key.
   * Allowing extra attributes to be sent for analytics events. */
  getAnalyticsAttributes?: (items: ViewData) => {},
};
type ActiveView = {
  analyticsAttributes?: {} | void,
  id: ViewID,
  type: ViewLayer,
  data: ViewData,
};
type IncomingView = {
  id: ViewID,
  type: ?ViewLayer,
};

export type Reducer = ViewData => ViewData;

export type ViewControllerProps = {
  initialPeekViewId?: ?ViewID,
  isDebugEnabled?: boolean,
};

export type ViewControllerState = {
  /** The view which is currently being rendered in the navigation. */
  activeView: ?ActiveView,
  /** The view which will become active once it has loaded. */
  incomingView: ?IncomingView,
  /** The view which should be rendered on the product navigation layer when the
   * active view is a 'container' view. @deprecated: The concept of peeking no
   * longer exists in the UX spec, so this feature will be removed in a future
   * release. */
  activePeekView: ?ActiveView,
  /** The view which will become the active peek view once it has loaded.
   * @deprecated */
  incomingPeekView: ?IncomingView,
};

export interface ViewControllerInterface {
  state: ViewControllerState;

  /** A map of all navigation views, keyed by their ID. */
  views: { [ViewID]: View };

  /** A map of reducer functions to be run over view items, keyed by the view's
   * ID. */
  reducers: { [ViewID]: Reducer[] };

  /** The view which will be 'peeked' to. @deprecated */
  initialPeekViewId: ?ViewID;

  /** In debug mode the view controller will log information about the usage of
   * reducers. */
  isDebugEnabled: boolean;

  /** Register a view. You must provide an `id`, the `type` of view ('product'
   * or 'container'), and a `getItems` function which should return either an
   * array of data, or a Promise which will resolve to an array of data. */
  addView: View => void;

  /** Un-register a view. If the view being removed is active it will remain so
   * until a different view is set. */
  removeView: ViewID => void;

  /** Set the registered view with the given ID as the active view. */
  setView: ViewID => void;

  /** Add a reducer to the view with the given ID. */
  addReducer: (ViewID, Reducer) => void;

  /** Remove a reducer from the view with the given ID. */
  removeReducer: (ViewID, Reducer) => void;

  /** Specify which view should be treated as the initial peek view. */
  setInitialPeekViewId: ViewID => void;

  /** Will re-resolve the active view and re-reduce its data. Accepts an
   * optional view ID to only re-resolve if the given ID matches the active
   * view. */
  updateActiveView: (ViewID | void) => void;

  /** Set whether the view controller is in debug mode. */
  setIsDebugEnabled: boolean => void;
}
