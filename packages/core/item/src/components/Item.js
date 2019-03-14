// @flow
import React, {
  Component,
  type ComponentType,
  type Node,
  type ElementRef,
} from 'react';

import styledRootElement from '../styled/Item';
import {
  Before,
  After,
  Content,
  ContentWrapper,
  Description,
} from '../styled/ItemParts';

type DnDType = {
  draggableProps: {
    style: ?Object,
    'data-react-beautiful-dnd-draggable': string,
  },
  dragHandleProps: ?Object,
  innerRef: Function,
  placeholder?: Node,
};

type Props = {
  /** Whether the Item should attempt to gain browser focus when mounted */
  autoFocus: boolean,
  /** Main content to be shown inside the item. */
  children?: Node,
  /** Secondary text to be shown underneath the main content. */
  description: string,
  /** Drag and drop props provided by react-beautiful-dnd. Please do not use
   * this unless using react-beautiful-dnd */
  dnd?: DnDType,
  /** Content to be shown after the main content. Shown to the right of content (or to the left
   * in RTL mode). */
  elemAfter?: Node,
  /** Content to be shown before the main content. Shown to the left of content (or to the right
   * in RTL mode). */
  elemBefore?: Node,
  /** Link that the user will be redirected to when the item is clicked. If omitted, a
   *  non-hyperlink component will be rendered. */
  href?: string,
  /** Causes the item to be rendered with reduced spacing. */
  isCompact: boolean,
  /** Causes the item to appear in a disabled state and click behaviours will not be triggered. */
  isDisabled: boolean,
  /** Used to apply correct dragging styles when also using react-beautiful-dnd. */
  isDragging?: boolean,
  /** Causes the item to still be rendered, but with `display: none` applied. */
  isHidden: boolean,
  /** Causes the item to appear with a persistent selected background state. */
  isSelected?: boolean,
  /** Optional function to be used for rendering links. Receives `href` and possibly `target`
   * as props. */
  linkComponent?: Function,
  /** Function to be called when the item is clicked, Receives the MouseEvent. */
  onClick?: Function,
  /** Function to be called when the item is pressed with a keyboard,
   * Receives the KeyboardEvent. */
  onKeyDown?: Function,
  /** Standard onmouseenter event */
  onMouseEnter?: Function,
  /** Standard onmouseleave event */
  onMouseLeave?: Function,
  /** Allows the role attribute of the item to be altered from it's default of
   *  `role="button"` */
  role: string,
  /** Allows the `children` content to break onto a new line, rather than truncating the
   *  content. */
  shouldAllowMultiline: boolean,
  /** Target frame for item `href` link to be aimed at. */
  target?: string,
  /** Standard browser title to be displayed on the item when hovered. */
  title?: string,
};
export default class Item extends Component<Props, {}> {
  static defaultProps = {
    autoFocus: false,
    description: '',
    isCompact: false,
    isDisabled: false,
    isHidden: false,
    role: 'button',
    shouldAllowMultiline: false,
  };

  rootComponent: ComponentType<any>;
  // eslint-disable-next-line react/sort-comp
  ref: ElementRef<any> | null;

  constructor(props: Object) {
    super(props);

    // The type of element rendered at the root of render() can vary based on the `href`
    // and `linkComponent` props provided. We generate this component here to avoid re-
    // generating the component inside render(). This is for performance reasons, and also
    // allows us to avoid generating a new `ref` for the root element each render().
    this.rootComponent = styledRootElement({
      href: this.href(),
      linkComponent: props.linkComponent,
    });
  }

  componentDidMount() {
    if (this.ref && this.props.autoFocus) {
      this.ref.focus();
    }
  }

  setRef = (ref: ElementRef<any> | null) => {
    this.ref = ref;
  };

  href = () => (this.props.isDisabled ? null : this.props.href);

  render() {
    const {
      onClick,
      onKeyDown,
      isCompact,
      isDisabled,
      isDragging,
      isHidden,
      isSelected,
      onMouseEnter,
      onMouseLeave,
      role,
      dnd,
      ...otherProps
    } = this.props;

    const { rootComponent: Root } = this;
    const dragHandleProps: ?Object = (dnd && dnd.dragHandleProps) || null;

    const patchedEventHandlers = {
      onClick: (event: MouseEvent) => {
        const original = () => {
          if (!isDisabled && onClick) {
            onClick(event);
          }
        };

        if (!dragHandleProps || !dragHandleProps.onClick) {
          original();
          return;
        }

        // Drag and drop has its own disabled mechansim
        // So not checking for isDisabled
        dragHandleProps.onClick(event);

        // if default is prevent - do not fire the onClick prop
        if (event.defaultPrevented) {
          return;
        }

        original();
      },
      onMouseDown: (event: MouseEvent) => {
        if (dragHandleProps && dragHandleProps.onMouseDown) {
          dragHandleProps.onMouseDown(event);
        }

        // We want to prevent the item from getting focus when clicked
        event.preventDefault();
      },
      onKeyDown: (event: KeyboardEvent) => {
        const original = () => {
          if (!isDisabled && onKeyDown) {
            onKeyDown(event);
          }
        };

        if (!dragHandleProps || !dragHandleProps.onKeyDown) {
          original();
          return;
        }

        dragHandleProps.onKeyDown(event);

        // if default is prevent - do not fire other handlers
        if (event.defaultPrevented) {
          return;
        }

        // not allowing keyboard events on the element while dragging
        if (isDragging) {
          return;
        }

        original();
      },
    };

    const patchedInnerRef = ref => {
      this.setRef(ref);

      if (dnd && dnd.innerRef) {
        dnd.innerRef(ref);
      }
    };

    return (
      <Root
        aria-disabled={isDisabled}
        href={this.href()}
        isCompact={isCompact}
        isDisabled={isDisabled}
        isDragging={isDragging}
        isHidden={isHidden}
        isSelected={isSelected}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role={role}
        tabIndex={isDisabled || isHidden || this.props.href ? null : 0}
        target={this.props.target}
        title={this.props.title}
        innerRef={patchedInnerRef}
        {...dnd && dnd.draggableProps}
        {...dragHandleProps}
        {...patchedEventHandlers}
        {...otherProps}
      >
        {!!this.props.elemBefore && (
          <Before isCompact={isCompact}>{this.props.elemBefore}</Before>
        )}
        <ContentWrapper>
          <Content allowMultiline={this.props.shouldAllowMultiline}>
            {this.props.children}
          </Content>
          {!!this.props.description && (
            <Description
              isCompact={this.props.isCompact}
              isDisabled={this.props.isDisabled}
            >
              {this.props.description}
            </Description>
          )}
        </ContentWrapper>
        {!!this.props.elemAfter && (
          <After isCompact={isCompact}>{this.props.elemAfter}</After>
        )}
      </Root>
    );
  }
}
