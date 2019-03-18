// @flow
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment, type Node } from 'react';
import { findDOMNode } from 'react-dom';
import uuid from 'uuid/v1';
import { withAnalyticsEvents, createAndFireEvent } from '@uidu/analytics';
import Button from '@uidu/button';
import Droplist, { Item, Group } from '@uidu/droplist';
import { ChevronDown } from 'react-feather';

import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';

import DropdownItemFocusManager from './context/DropdownItemFocusManager';
import DropdownItemClickManager from './context/DropdownItemClickManager';
import DropdownItemSelectionCache from './context/DropdownItemSelectionCache';
import WidthConstrainer from '../styled/WidthConstrainer';
import { KEY_DOWN, KEY_SPACE, KEY_ENTER } from '../util/keys';
import type {
  DeprecatedItem,
  DeprecatedItemGroup,
  DropdownMenuStatelessProps,
} from '../types';

type OpenCloseArgs = {
  event: SyntheticMouseEvent<any> | SyntheticKeyboardEvent<any>,
  source?: 'click' | 'keydown',
};

type State = {
  id: string,
  autoFocusDropdownItems: boolean,
};

class DropdownMenuStateless extends Component<
  DropdownMenuStatelessProps,
  State,
> {
  domItemsList: ?NodeList<HTMLElement>;

  focusedItem: ?number;

  triggerContainer: ?HTMLElement;

  sourceOfIsOpen: ?string;
  dropdownListPositioned: boolean = false;

  static defaultProps = {
    appearance: 'default',
    boundariesElement: 'viewport',
    isLoading: false,
    isOpen: false,
    items: [],
    onItemActivated: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    isMenuFixed: false,
    shouldAllowMultilineItems: false,
    shouldFitContainer: false,
    shouldFlip: true,
    triggerType: 'default',
    onPositioned: () => {},
  };

  state = {
    id: uuid(),
    autoFocusDropdownItems: false,
  };

  componentDidMount = () => {
    if (this.isUsingDeprecatedAPI()) {
      if (
        process.env.NODE_ENV !== 'test' &&
        process.env.NODE_ENV !== 'production'
      ) {
        // eslint-disable-next-line no-console
        console.log(
          'DropdownMenu.items is deprecated. Please switch to the declarative API.',
        );
      }

      if (this.domItemsList) {
        this.focusFirstItem();
      }
    }
  };

  componentDidUpdate = (prevProp: DropdownMenuStatelessProps) => {
    if (this.isUsingDeprecatedAPI() && this.props.isOpen && !prevProp.isOpen) {
      this.focusFirstItem();
    }
  };

  getNextFocusable = (indexItem?: ?number, available?: number): ?number => {
    if (!this.domItemsList) {
      return null;
    }

    let currentItem = typeof indexItem !== 'number' ? -1 : indexItem;
    const latestAvailable =
      typeof available !== 'number' ? currentItem : available;

    if (currentItem < this.domItemsList.length - 1) {
      currentItem++;

      if (
        this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true'
      ) {
        return currentItem;
      }

      return this.getNextFocusable(currentItem, latestAvailable);
    }

    return latestAvailable;
  };

  getPrevFocusable = (indexItem?: ?number, available?: number): ?number => {
    if (!this.domItemsList) {
      return null;
    }

    let currentItem = typeof indexItem !== 'number' ? -1 : indexItem;
    const latestAvailable =
      typeof available !== 'number' ? currentItem : available;

    if (currentItem && currentItem > 0) {
      currentItem--;

      if (
        this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true'
      ) {
        return currentItem;
      }

      return this.getPrevFocusable(currentItem, latestAvailable);
    }

    return latestAvailable || currentItem;
  };

  focusFirstItem = () => {
    if (this.sourceOfIsOpen === 'keydown') {
      this.focusItem(this.getNextFocusable());
    }
  };

  focusNextItem = () => {
    this.focusItem(this.getNextFocusable(this.focusedItem));
  };

  focusPreviousItem = () => {
    this.focusItem(this.getPrevFocusable(this.focusedItem));
  };

  focusItem = (index: ?number) => {
    if (!this.domItemsList || !index) {
      return;
    }

    this.focusedItem = index;
    this.domItemsList[this.focusedItem].focus();
  };

  isTargetChildItem = (target: Element) => {
    if (!target) return false;

    const isDroplistItem = target.getAttribute('data-role') === 'droplistItem';

    // eslint-disable-next-line react/no-find-dom-node
    const thisDom = findDOMNode(this);
    return isDroplistItem && thisDom ? thisDom.contains(target) : false;
  };

  handleKeyboardInteractionForClosed = (event: SyntheticKeyboardEvent<any>) => {
    if (this.props.isOpen) {
      return;
    }

    switch (event.key) {
      case KEY_DOWN:
      case KEY_SPACE:
      case KEY_ENTER:
        event.preventDefault();
        this.open({ event, source: 'keydown' });
        break;
      default:
        break;
    }
  };

  handleKeyboardInteractionsDeprecated = (
    event: SyntheticKeyboardEvent<any>,
  ) => {
    // KeyboardEvent.target is typed as an EventTarget but we need to access methods on it which
    // are specific to Element. Due limitations of the HTML spec flow doesn't know that an
    // EventTarget can have these methods, so we cast it to Element through Object. This is the
    // safest thing we can do in this situation.
    // https://flow.org/en/docs/types/casting/#toc-type-casting-through-any
    const target: Element = (event.target: Object);
    if (this.props.isOpen) {
      if (this.isTargetChildItem(target)) {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault();
            this.focusPreviousItem();
            break;
          case 'ArrowDown':
            event.preventDefault();
            this.focusNextItem();
            break;
          case 'Tab':
            event.preventDefault();
            this.close({ event });
            break;
          default:
            break;
        }
      } else if (event.key === 'ArrowDown') {
        this.sourceOfIsOpen = 'keydown';
        this.focusFirstItem();
      } else if (event.key === 'Tab') {
        this.close({ event });
      }
    } else {
      switch (event.key) {
        case KEY_DOWN:
        case KEY_SPACE:
        case KEY_ENTER:
          event.preventDefault();
          this.open({ event, source: 'keydown' });
          break;
        default:
          break;
      }
    }
  };

  domMenuContainer: ?HTMLElement;

  handleClickDeprecated = (event: SyntheticMouseEvent<any>) => {
    const menuContainer = this.domMenuContainer;
    // Casting target to Element. See comment in `handleKeyboardInteractionsDeprecated`.
    const target: Element = (event.target: Object);
    if (!menuContainer || (menuContainer && !menuContainer.contains(target))) {
      this.toggle({ source: 'click', event });
    }
  };

  isUsingDeprecatedAPI = () => Boolean(this.props.items.length);

  handleClick = (event: SyntheticMouseEvent<any>) => {
    // For any clicks we don't want autofocus
    this.setState({ autoFocusDropdownItems: false });
    if (this.isUsingDeprecatedAPI()) {
      this.handleClickDeprecated(event);
      return;
    }

    const { triggerContainer } = this;
    // Casting target to Element. See comment in `handleKeyboardInteractionsDeprecated`.
    const target: Element = (event.target: Object);
    if (
      triggerContainer &&
      triggerContainer.contains(target) &&
      // $FlowFixMe - disabled is not in Element
      target.disabled !== true
    ) {
      const { isOpen } = this.props;
      this.sourceOfIsOpen = 'mouse';
      this.props.onOpenChange({ isOpen: !isOpen, event });
    }
  };

  triggerContent = () => {
    const {
      children,
      trigger,
      isOpen,
      triggerButtonProps,
      triggerType,
    } = this.props;
    const insideTriggerContent = this.isUsingDeprecatedAPI()
      ? children
      : trigger;

    if (triggerType !== 'button') {
      return insideTriggerContent;
    }

    const triggerProps = { ...triggerButtonProps };
    const defaultButtonProps = {
      ariaControls: this.state.id,
      ariaExpanded: isOpen,
      ariaHaspopup: true,
      isSelected: isOpen,
    };
    if (!triggerProps.iconAfter && !triggerProps.iconBefore) {
      triggerProps.iconAfter = <ChevronDown size="16" label="" />;
    }
    return (
      <Button {...defaultButtonProps} {...triggerProps}>
        {insideTriggerContent}
      </Button>
    );
  };

  open = (attrs: OpenCloseArgs) => {
    this.sourceOfIsOpen = attrs.source;
    this.props.onOpenChange({ isOpen: true, event: attrs.event });
    // Dropdown opened via keyboard gets auto focussed
    this.setState({
      autoFocusDropdownItems: this.sourceOfIsOpen === 'keydown',
    });
  };

  close = (attrs: OpenCloseArgs) => {
    this.sourceOfIsOpen = null;
    this.props.onOpenChange({ isOpen: false, event: attrs.event });
  };

  toggle = (attrs: OpenCloseArgs) => {
    if (attrs.source === 'keydown') return;

    if (this.props.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  };

  handleItemClicked = (
    event: SyntheticMouseEvent<any> | SyntheticKeyboardEvent<any>,
  ) => {
    this.props.onOpenChange({ isOpen: false, event });
  };

  renderTrigger = () => {
    const triggerContent = this.triggerContent();
    return this.isUsingDeprecatedAPI() ? (
      triggerContent
    ) : (
      <div
        ref={ref => {
          this.triggerContainer = ref;
        }}
      >
        {triggerContent}
      </div>
    );
  };

  renderItems = (items: DeprecatedItem[]): Node[] =>
    items.map((item: DeprecatedItem, itemIndex: number) => (
      <Item
        {...item}
        key={itemIndex}
        onActivate={({ event }) => {
          this.props.onItemActivated({ item, event });
        }}
      >
        {item.content}
      </Item>
    ));

  renderGroups = (groups: DeprecatedItemGroup[]): Node[] =>
    groups.map((group, groupIndex) => (
      <Group
        heading={group.heading}
        elemAfter={group.elemAfter}
        key={groupIndex}
      >
        {this.renderItems(group.items)}
      </Group>
    ));

  renderDeprecated = () => {
    const { items, shouldFitContainer } = this.props;
    const { id } = this.state;

    return (
      <div
        id={id}
        ref={ref => {
          this.domMenuContainer = ref;
          this.domItemsList = ref
            ? ref.querySelectorAll('[data-role="droplistItem"]')
            : null;
        }}
        role="menu"
        style={shouldFitContainer ? null : { maxWidth: 300 }}
      >
        {this.renderGroups(items)}
      </div>
    );
  };

  /** Ensure droplist is positioned before focussing to avoid container scrolling to top */
  onDroplistPositioned = () => {
    this.dropdownListPositioned = true;
    // Trigger render so item focus manager can auto focus for keyboard trigger
    this.setState({
      autoFocusDropdownItems: this.sourceOfIsOpen === 'keydown',
    });

    if (this.props.onPositioned) this.props.onPositioned();
  };

  /** Render focusManager only after droplist has been positioned when trigger via keyboard */
  renderDropdownItems = () => {
    if (this.sourceOfIsOpen === 'keydown' && this.dropdownListPositioned) {
      return (
        <DropdownItemFocusManager
          autoFocus={this.state.autoFocusDropdownItems}
          close={this.close}
        >
          {this.props.children}
        </DropdownItemFocusManager>
      );
    }
    return <Fragment>{this.props.children}</Fragment>;
  };

  render() {
    const {
      appearance,
      boundariesElement,
      isLoading,
      isOpen,
      onOpenChange,
      position,
      isMenuFixed,
      shouldAllowMultilineItems,
      shouldFitContainer,
      shouldFlip,
    } = this.props;
    const { id } = this.state;
    const isDeprecated = this.isUsingDeprecatedAPI();

    const deprecatedProps = isDeprecated
      ? {
          onKeyDown: this.handleKeyboardInteractionsDeprecated,
          shouldAllowMultilineItems,
        }
      : {
          onKeyDown: this.handleKeyboardInteractionForClosed,
        };
    return (
      <DropdownItemSelectionCache>
        <Droplist
          appearance={appearance}
          boundariesElement={boundariesElement}
          isLoading={isLoading}
          isOpen={isOpen}
          onClick={this.handleClick}
          onOpenChange={onOpenChange}
          position={position}
          isMenuFixed={isMenuFixed}
          shouldFitContainer={shouldFitContainer}
          shouldFlip={shouldFlip}
          trigger={this.renderTrigger()}
          onPositioned={this.onDroplistPositioned}
          {...deprecatedProps}
          analyticsContext={{
            componentName: 'dropdownMenu',
            packageName,
            packageVersion,
          }}
        >
          {isDeprecated ? (
            this.renderDeprecated()
          ) : (
            <WidthConstrainer
              id={id}
              role="menu"
              shouldFitContainer={shouldFitContainer}
            >
              <DropdownItemClickManager onItemClicked={this.handleItemClicked}>
                {this.renderDropdownItems()}
              </DropdownItemClickManager>
            </WidthConstrainer>
          )}
        </Droplist>
      </DropdownItemSelectionCache>
    );
  }
}

export { DropdownMenuStateless as DropdownMenuStatelessWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('uidu');

export default withAnalyticsEvents({
  onOpenChange: createAndFireEventOnAtlaskit({
    action: 'toggled',
    actionSubject: 'dropdownMenu',

    attributes: {
      componentName: 'dropdownMenu',
      packageName,
      packageVersion,
    },
  }),
})(DropdownMenuStateless);
