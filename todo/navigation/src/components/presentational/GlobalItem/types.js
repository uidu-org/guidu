// @flow

import type { ComponentType, Node } from 'react';

import type { StyleReducer, GlobalTheme } from '../../../theme/types';
import type { InteractionState } from '../InteractionStateManager/types';

type Size = 'large' | 'small';

export type GlobalItemPresentationProps = {
  /** Whether the Item is currently in the 'active' interaction state. */
  isActive: boolean,
  /** Whether the Item is currently in the 'select' interaction state. */
  isSelected: boolean,
  /** Whether the Item is currently in the 'hover' interaction state. */
  isHover: boolean,
  /** The size of the GlobalItem. */
  size: Size,
};

export type GlobalItemStyles = {
  itemBase: { [key: string]: any },
  badgeWrapper: { [key: string]: any },
  itemWrapper: { [key: string]: any },
};

type GlobalItemIconProps = {
  label: string,
  secondaryColor: 'inherit',
  size: 'large' | null,
};

export type HOCProvidedProps = {
  /** An internal prop provided by our theme HOC. Should not be provided externally */
  theme: GlobalTheme,
};

type BaseItemProps = HOCProvidedProps & {
  /** A component to render over the GlobalItem in the the badge position. */
  badge?: ComponentType<GlobalItemPresentationProps>,
  /** An href which this Item links to. If this prop is provided the Item will
   * render as an <a>. */
  href?: string,
  /** A component which should render the main content of this GlobalItem. There
   * is an assumption that this will typically be an Atlaskit Icon component, so
   * it will be passed `label`, `secondaryColor`, and `size` props. */
  icon: ?ComponentType<GlobalItemIconProps>,
  /* The id of the item to be used in analytics and react keying */
  id?: string,
  /** The zero-based index for the position of the item within the global
   *  sidebar section. Used for analytics purposes. */
  index?: number,
  /** Whether this GlobalItem should display as being selected. */
  isSelected?: boolean,
  /** A label to pass to the `icon` component. */
  label?: string,
  /** A handler which will be called when the GlobalItem is clicked. */
  onClick?: (SyntheticEvent<HTMLElement>) => void,
  /** The size of the GlobalItem. */
  size?: Size,
  /** A function which will be passed the default styles object for the Item,
   * and should return a new styles object. Allows you to patch and customise
   * the GlobalItem's appearance. */
  styles?: StyleReducer,
  /** The HTML target attribute. Will only be used if href is also set. */
  target?: string,
  /** A string/Node to render in a tooltip which will appear when the GlobalItem
   * is hovered. */
  tooltip?: Node,
};

export type GlobalItemRenderComponentProps = BaseItemProps & {
  children: Node,
  className: string,
};

export type GlobalItemProps = BaseItemProps & {
  /** A custom component to render instead of the default wrapper component.
   * Could be used to render a router Link, for example. The component will be
   * provided with the standard globalItem props. It will also be provided
   * className, children and onClick props which should be passed on to the
   * element you render. */
  component?: ComponentType<GlobalItemRenderComponentProps>,
};

// TODO: Type withTheme HOC instead and have consumers of GlobalItemProps reference
// the type of the GlobalItem component instead
export type ExternalGlobalItemProps = $Diff<GlobalItemProps, HOCProvidedProps>;

export type GlobalItemPrimitiveProps = GlobalItemProps & InteractionState;
