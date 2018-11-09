// @flow

import type { Node } from 'react';

import UIController from './UIController';

/**
 * UIController
 */
export type InitialUIControllerShape = {
  isCollapsed?: boolean,
  isPeekHinting?: boolean,
  isPeeking?: boolean,
  isResizeDisabled?: boolean,
  productNavWidth?: number,
};

export type UIControllerCacheShape = {
  isCollapsed: boolean,
  productNavWidth: number,
};

export type UIControllerShape = {
  /** Whether the navigation is currently collapsed. */
  isCollapsed: boolean,
  /** Whether the navigation is currently performing a 'peek hint'. @deprecated:
   * The concept of peeking has been removed from the UX spec so this property
   * will be removed in a future release. */
  isPeekHinting: boolean,
  /** Whether the navigation is currently performing a 'peek'. @deprecated: The
   * concept of peeking has been removed from the UX spec so this property will
   * be removed in a future release. */
  isPeeking: boolean,
  /** Whether the navigation is currently being resized. */
  isResizing: boolean,
  /** Whether expanding, collapsing, and resizing are currently disabled. */
  isResizeDisabled: boolean,
  /** The width of the content navigation area. */
  productNavWidth: number,
};

export type UIControllerCacheGetter = () => UIControllerCacheShape;

export type UIControllerCacheSetter = UIControllerCacheShape => void;

export type UIControllerCache = {
  get: UIControllerCacheGetter,
  set: UIControllerCacheSetter,
};

export interface UIControllerInterface {
  state: UIControllerShape;

  /** Collapsed the content navigation. */
  collapse: () => void;
  /** Expand the content navigation. */
  expand: () => void;
  /** Toggle the collapse/expand state of the content navigation. */
  toggleCollapse: () => void;

  /** Shift the container navigation layer to suggest that a 'peek' can be
   * performed. @deprecated */
  peekHint: () => void;
  /** Reset the position of the container navigation layer. @deprecated */
  unPeekHint: () => void;
  /** Toggle the hinting state of the container navigation layer. @deprecated */
  togglePeekHint: () => void;

  /** Slide the container navigation layer out of the way, or transition a
   * nested product navigation view, to reveal the 'root product home view'.
   * @deprecated */
  peek: () => void;
  /** Reset the navigation to its state before a peek was performed. @deprecated */
  unPeek: () => void;
  /** Toggle the peeking state of the navigation. @deprecated */
  togglePeek: () => void;
}

/**
 * UIControllerSubscriber
 */
export type UIControllerSubscriberProps = {
  children: UIController => Node,
};
