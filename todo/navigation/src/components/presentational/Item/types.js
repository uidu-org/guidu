// @flow

import type { ComponentType, Node, Ref } from 'react';
import type { DraggableProps } from 'react-beautiful-dnd';
import type { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';

import type { StyleReducer, ProductTheme } from '../../../theme/types';
import type { InteractionState } from '../InteractionStateManager/types';

type Spacing = 'compact' | 'default';

export type ItemPresentationProps = {
  /** Whether the Item is currently in the 'active' interaction state. */
  isActive: boolean,
  /** Whether the Item is inside a SortableContext, and is being dragged. */
  isDragging?: boolean,
  /** Whether the Item is currently in the 'hover' interaction state. */
  isHover: boolean,
  /** Whether the Item should display as being selected. */
  isSelected: boolean,
  /** Whether the Item is currently in the 'focus' interaction state. */
  isFocused: boolean,
  /** How tight the spacing between the elements inside the Item should be. */
  spacing: Spacing,
};

export type ItemBaseProps = {
  /** A component to render after the text. Typically used to render an icon or
   * a badge. This component will be passed the current UI state of the Item. */
  after?: ComponentType<ItemPresentationProps>,
  /** A component to render before the text. Typically used to render an icon or
   * an avatar. This component will be passed the current UI state of the Item.
   * */
  before?: ComponentType<ItemPresentationProps>,
  /** Properties exclusive to Items within a SortableContext. */
  draggableProps?: DraggableProps,
  /** An href which this Item links to. If this prop is provided the Item will
   * render as an <a>. */
  href?: string,
  /** A unique identifier for the item. Used for analytics. */
  id?: string,
  /** The zero-based index for the position of the item within it's group.
   *  Used for analytics purposes.
   */
  index?: number,
  /* React ref to the outer-most wrapping element */
  innerRef?: Ref<*>,
  /** Whether the Item is part of a SortableContext, and is being dragged. */
  isDragging?: boolean,
  /** Whether this Item should display as being selected. */
  isSelected: boolean,
  /** A handler which will be called when the Item is clicked. */
  onClick?: (SyntheticEvent<MouseEvent>) => void,
  /** How tight the spacing between the elements inside the Item should be. */
  spacing: Spacing,
  /** A function which will be passed the default styles object for the Item as
   * well as its current state, and should return a new styles object. Allows
   * you to patch and customise the Item's appearance. */
  styles: StyleReducer,
  /** The string to render as a 'description' under the main text content in the
   * Item. */
  subText?: string,
  /** The HTML target attribute. Will only be used if href is also set. */
  target?: string,
  /** A string or Node to render as the main content of the Item. */
  text: Node,
};

export type ItemRenderComponentProps = ItemBaseProps & {
  children: Node,
  className: string,
};

export type ItemProps = ItemBaseProps & {
  /** A custom component to render instead of the default wrapper component.
   * Could used to render a router Link, for example. The component will be
   * provided with a className, children and onClick props, which should be passed on to the
   * element you render. If this is a SortableItem, you will also need to spread `draggableProps` and
   * set ref of `innerRef` to your outermost DOM element. */
  component?: ComponentType<ItemRenderComponentProps>,
};

export type ItemPrimitiveProps = ItemProps &
  WithAnalyticsEventsProps &
  InteractionState & { theme: ProductTheme };
