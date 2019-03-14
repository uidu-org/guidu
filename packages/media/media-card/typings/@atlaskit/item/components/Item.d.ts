import { Component, ComponentType, ReactNode, Ref } from 'react';

export type ItemDnD = {
  draggableProps: {
    style?: Object;
    'data-react-beautiful-dnd-draggable': string;
  };
  dragHandleProps?: Object;
  innerRef: Function;
  placeholder?: ReactNode;
};

export type ItemProps = {
  /** Whether the Item should attempt to gain browser focus when mounted */
  autoFocus?: boolean;
  /** Main content to be shown inside the item. */
  children?: ReactNode;
  /** Secondary text to be shown underneath the main content. */
  description?: string;
  /** Drag and drop props provided by react-beautiful-dnd. Please do not use
   * this unless using react-beautiful-dnd */
  dnd?: ItemDnD;
  /** Content to be shown after the main content. Shown to the right of content (or to the left
   * in RTL mode). */
  elemAfter?: ReactNode;
  /** Content to be shown before the main content. Shown to the left of content (or to the right
   * in RTL mode). */
  elemBefore?: ReactNode;
  /** Link that the user will be redirected to when the item is clicked. If omitted, a
   *  non-hyperlink component will be rendered. */
  href?: string;
  /** Causes the item to be rendered with reduced spacing. */
  isCompact?: boolean;
  /** Causes the item to appear in a disabled state and click behaviours will not be triggered. */
  isDisabled?: boolean;
  /** Used to apply correct dragging styles when also using react-beautiful-dnd. */
  isDragging?: boolean;
  /** Causes the item to still be rendered, but with `display: none` applied. */
  isHidden?: boolean;
  /** Causes the item to appear with a persistent selected background state. */
  isSelected?: boolean;
  /** Optional function to be used for rendering links. Receives `href` and possibly `target`
   * as props. */
  linkComponent?: Function;
  /** Function to be called when the item is clicked, Receives the MouseEvent. */
  onClick?: Function;
  /** Function to be called when the item is pressed with a keyboard,
   * Receives the KeyboardEvent. */
  onKeyDown?: Function;
  /** Standard onmouseenter event */
  onMouseEnter?: Function;
  /** Standard onmouseleave event */
  onMouseLeave?: Function;
  /** Allows the role attribute of the item to be altered from it's default of
   *  `role="button"` */
  role?: string;
  /** Allows the `children` content to break onto a new line, rather than truncating the
   *  content. */
  shouldAllowMultiline?: boolean;
  /** Target frame for item `href` link to be aimed at. */
  target?: string;
  /** Standard browser title to be displayed on the item when hovered. */
  title?: string;
};

export default class Item extends Component<ItemProps, {}> {}
