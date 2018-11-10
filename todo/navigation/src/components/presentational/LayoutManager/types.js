// @flow

import type { ComponentType, ElementRef, Node } from 'react';

import UIController from '../../../ui-controller/UIController';

export type CollapseListener = (HTMLElement, boolean) => void;

export type CollapseToggleTooltipContent = (
  isCollapsed: boolean,
) => { text: string, char: string } | null;

export type CollapseListeners = {
  /** Called when the navigation begins expanding. */
  onExpandStart?: CollapseListener,
  /** Called when the navigation completes expanding. */
  onExpandEnd?: CollapseListener,
  /** Called when the navigation begins collapsing. */
  onCollapseStart?: CollapseListener,
  /** Called when the navigation completes collapsing. */
  onCollapseEnd?: CollapseListener,
};

type NonStringRef<T> = {
  current: ElementRef<T>,
} | null;

export type ExperimentalFeatureFlags = {
  /**
    NOTE: This property is experimental and may be removed in a minor release.

    Allow the user to invoke a partial display of the navigation when they
    mouse over the nav area whilst in a collapsed state.
  */
  experimental_flyoutOnHover: boolean,
};

export type GetRefs = ({
  expandCollapseAffordance: NonStringRef<'button'>,
}) => void;

export type ConnectedLayoutManagerProps = CollapseListeners & {
  /** Your page content. */
  children: Node,
  /** A component which will render the container navigation layer. */
  containerNavigation: ?ComponentType<{}>,
  /** A function to access the refs of some elements within the LayoutManager
   * component. */
  getRefs?: GetRefs,
  /** A component which will render the global navigation bar. */
  globalNavigation: ComponentType<{}>,
  /** A component which will render the product navigation layer. */
  productNavigation: ComponentType<{}>,
  /** Displayed when the user's mouse is over the collapse/expand toggle. */
  collapseToggleTooltipContent?: CollapseToggleTooltipContent,
};

export type LayoutManagerProps = ConnectedLayoutManagerProps &
  ExperimentalFeatureFlags & {
    navigationUIController: UIController,
  };
