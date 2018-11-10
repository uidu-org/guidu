// @flow

import type { Element } from 'react';

import type {
  InitialUIControllerShape,
  UIControllerCache,
} from '../ui-controller/types';

/**
 * NavigationProvider
 */
export type NavigationProviderProps = {
  /** Your application. */
  children: Element<*>,
  /** A mechanism for persisting the UI state between page loads. This should be
   * an object which contains `get` and `set` methods. By default localStorage
   * is used. Pass `false` to opt out of persisting the UI state. */
  cache: UIControllerCache | false,
  /** The ID of the view which should be rendered in the product navigation
   * layer when there is a container navigation view active. The view controller
   * exposes a method to set this imperatively, but passing it here will
   * initialise the view controller in this state.  */
  initialPeekViewId: ?string,
  /** The initial state for the UI controller. */
  initialUIController?: InitialUIControllerShape,
  /** In debug mode the view controller will log information about the usage of
   * reducers. */
  isDebugEnabled: boolean,
};
