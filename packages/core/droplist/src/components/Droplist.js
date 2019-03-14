// @flow

import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@uidu/analytics';
import Layer from '@atlaskit/layer';
import Spinner from '@uidu/spinner';
import { ThemeProvider } from 'styled-components';
import { gridSize } from '@uidu/theme';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import Wrapper, {
  Content,
  SpinnerContainer,
  Trigger,
} from '../styled/Droplist';
import itemTheme from '../theme/item-theme';

const halfFocusRing = 1;
const dropOffset = `0 ${gridSize()}px`;

type Props = {
  /**
   * Controls the appearance of the menu.
   * Default menu has scroll after its height exceeds the pre-defined amount.
   * Tall menu has no scroll until the height exceeds the height of the viewport.
   */
  appearance?: 'default' | 'tall',
  /** Value passed to the Layer component to determine when to reposition the droplist */
  boundariesElement?: 'viewport' | 'window' | 'scrollParent',
  /** Content that will be rendered inside the layer element. Should typically be
   * `ItemGroup` or `Item`, or checkbox / radio variants of those. */
  children?: Node,
  /** If true, a Spinner is rendered instead of the items */
  isLoading?: boolean,
  /** Controls the open state of the drop list. */
  isOpen?: boolean,
  onClick?: any => mixed,
  onKeyDown?: any => mixed,
  onOpenChange?: any => mixed,
  /** Position of the menu. See the documentation of @uidu/layer for more details. */
  position?: string,
  /** Value passed to the Layer component to determine if the list will be fixed positioned. Useful for breaking out of overflow scroll/hidden containers. Note that the layer will become detached from the target element when scrolling so scroll lock or close on scroll handling may be necessary. */
  isMenuFixed: boolean,
  /** Deprecated. Option to display multiline items when content is too long.
   * Instead of ellipsing the overflown text it causes item to flow over multiple lines.
   */
  shouldAllowMultilineItems?: boolean,
  /** Option to fit dropdown menu width to its parent width */
  shouldFitContainer?: boolean,
  /** Allows the dropdown menu to be placed on the opposite side of its trigger if it does not
   * fit in the viewport. */
  shouldFlip?: boolean,
  /** Controls the height at which scroll bars will appear on the drop list. */
  maxHeight?: number,
  /** Content which will trigger the drop list to open and close. */
  trigger?: Node,
  /** Callback to know when the list is first correctly positioned within it's Layer */
  onPositioned?: Function,
};

class Droplist extends Component<Props, void> {
  static defaultProps = {
    appearance: 'default',
    boundariesElement: 'viewport',
    children: null,
    isLoading: false,
    isOpen: false,
    onClick: () => {},
    onKeyDown: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    isMenuFixed: false,
    shouldAllowMultilineItems: false,
    shouldFitContainer: false,
    shouldFlip: true,
    trigger: null,
    onPositioned: () => {},
  };

  static childContextTypes = {
    shouldAllowMultilineItems: PropTypes.bool,
  };

  getChildContext() {
    return { shouldAllowMultilineItems: this.props.shouldAllowMultilineItems };
  }

  componentDidMount = () => {
    this.setContentWidth();
    // We use a captured event here to avoid a radio or checkbox dropdown item firing its
    // click event first, which would cause a re-render of the element and prevent Droplist
    // from detecting the actual source of this original click event.
    document.addEventListener('click', this.handleClickOutside, true);
    document.addEventListener('keydown', this.handleEsc);
  };

  componentDidUpdate = () => {
    if (this.props.isOpen) {
      this.setContentWidth();
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside, true);
    document.removeEventListener('keydown', this.handleEsc);
  };

  setContentWidth = (): void => {
    const { dropContentRef, triggerRef } = this;
    const { shouldFitContainer } = this.props;

    // We need to manually set the content width to match the trigger width
    // if props.shouldFitContainer is true
    if (shouldFitContainer && dropContentRef && triggerRef) {
      dropContentRef.style.width = `${triggerRef.offsetWidth -
        halfFocusRing * 2}px`;
    }
  };

  dropContentRef: HTMLElement;
  triggerRef: HTMLElement;

  handleEsc = (event: KeyboardEvent): void => {
    if ((event.key === 'Escape' || event.key === 'Esc') && this.props.isOpen) {
      this.close(event);
    }
  };

  handleClickOutside = (event: Event): void => {
    if (this.props.isOpen) {
      // $FlowFixMe - flow is lost and if not an instance of Node
      if (event.target instanceof Node) {
        // Rather than check for the target within the entire Droplist, we specify the trigger/content.
        // This aids with future effort in scroll-locking Droplist when isMenuFixed is enabled; the scroll
        // blanket which stretches to the viewport should not stop 'close' from being triggered.
        const withinTrigger =
          this.triggerRef && this.triggerRef.contains(event.target);
        const withinContent =
          this.dropContentRef && this.dropContentRef.contains(event.target);

        if (!withinTrigger && !withinContent) {
          this.close(event);
        }
      }
    }
  };

  close = (event: Event): void => {
    if (this.props.onOpenChange) {
      this.props.onOpenChange({ isOpen: false, event });
    }
  };

  handleContentRef = (ref: HTMLElement) => {
    this.dropContentRef = ref;

    // If the dropdown has just been opened, we focus on the containing element so the
    // user can tab to the first dropdown item. We will only receive this ref if isOpen
    // is true or null, so no need to check for truthiness here.
    if (ref) {
      ref.focus();
    }
  };

  handleTriggerRef = (ref: HTMLElement) => {
    this.triggerRef = ref;
  };

  render() {
    const {
      appearance,
      boundariesElement,
      children,
      isLoading,
      isOpen,
      maxHeight,
      onClick,
      onKeyDown,
      position,
      isMenuFixed,
      shouldFitContainer,
      shouldFlip,
      trigger,
      onPositioned,
    } = this.props;

    const layerContent = isOpen ? (
      <Content
        data-role="droplistContent"
        isTall={appearance === 'tall'}
        innerRef={this.handleContentRef}
        maxHeight={maxHeight}
      >
        {isLoading ? (
          <SpinnerContainer>
            <Spinner size="small" />
          </SpinnerContainer>
        ) : (
          <ThemeProvider theme={itemTheme}>
            <div>{children}</div>
          </ThemeProvider>
        )}
      </Content>
    ) : null;

    return (
      <Wrapper fit={shouldFitContainer} onClick={onClick} onKeyDown={onKeyDown}>
        <Layer
          autoFlip={shouldFlip}
          boundariesElement={boundariesElement}
          content={layerContent}
          offset={dropOffset}
          // $FlowFixMe - Cannot create `Layer` element because in property `position
          position={position}
          isAlwaysFixed={isOpen && isMenuFixed}
          onPositioned={onPositioned}
        >
          <Trigger fit={shouldFitContainer} innerRef={this.handleTriggerRef}>
            {trigger}
          </Trigger>
        </Layer>
      </Wrapper>
    );
  }
}

export { Droplist as DroplistWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'droplist',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onOpenChange: createAndFireEventOnAtlaskit({
      action: 'toggled',
      actionSubject: 'droplist',

      attributes: {
        componentName: 'droplist',
        packageName,
        packageVersion,
      },
    }),
  })(Droplist),
);
