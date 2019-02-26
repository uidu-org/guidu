// @flow

import type { ComponentType, Node } from 'react';
import type { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';

export type DrawerWidth = 'narrow' | 'medium' | 'wide' | 'extended' | 'full';

export type BaseProps = {
  /** The content of the drawer */
  children: Node,
  /** Icon to be rendered in your drawer as a component, if available */
  icon?: ComponentType<*>,
  /** Available drawer sizes */
  width: DrawerWidth,
};

export type DrawerPrimitiveProps = BaseProps & {
  in: boolean,
  onClose?: (SyntheticMouseEvent<*>) => void,
  onCloseComplete?: (node: HTMLElement) => void,
  shouldUnmountOnExit?: boolean,
};

export type DrawerProps = BaseProps & {
  ...WithAnalyticsEventsProps,
  /**
      Callback function to be called when the drawer will be closed.
    */
  onClose?: (
    SyntheticMouseEvent<*> | SyntheticKeyboardEvent<*>,
    analyticsEvent: any,
  ) => void,
  /** A callback function that will be called when the drawer has finished its close transition. */
  onCloseComplete?: (node: HTMLElement) => void,
  /**
      Callback function that will be called when the drawer is displayed and `keydown` event is triggered.
    */
  onKeyDown?: (SyntheticKeyboardEvent<*>) => void,
  /** Controls if the drawer is open or close */
  isOpen: boolean,
  /** Boolean that controls if drawer should be retained/discarded */
  shouldUnmountOnExit?: boolean,
};

/**
  Type of keyboard event that triggers which key will should close the drawer.
*/
export type CloseTrigger = 'backButton' | 'blanket' | 'escKey';
