/* eslint-disable react/no-array-index-key */
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import Button from '@uidu/button';
import Droplist from '@uidu/droplist';
import React, { Component, KeyboardEvent, MouseEvent } from 'react';
import { findDOMNode } from 'react-dom';
import { uid } from 'react-uid';
import WidthConstrainer from '../styled/WidthConstrainer';
import { DropdownMenuStatelessProps, OnOpenChangeArgs } from '../types';
import { KEY_DOWN, KEY_ENTER, KEY_SPACE } from '../util/keys';
import DropdownItemClickManager from './context/DropdownItemClickManager';
import DropdownItemFocusManager from './context/DropdownItemFocusManager';
import DropdownItemSelectionCache from './context/DropdownItemSelectionCache';

interface OpenCloseArgs {
  event: MouseEvent | KeyboardEvent;
  source?: 'click' | 'keydown';
}

interface State {
  id: string;
  autoFocusDropdownItems: boolean;
}

class DropdownMenuStateless extends Component<
  DropdownMenuStatelessProps,
  State
> {
  domItemsList?: NodeListOf<HTMLElement> | null;

  focusedItem?: number;

  triggerContainer?: HTMLElement;

  sourceOfIsOpen?: string | null;

  dropdownListPositioned: boolean = false;

  static defaultProps = {
    appearance: 'default',
    boundariesElement: 'viewport',
    isLoading: false,
    isOpen: false,
    onOpenChange: () => {},
    position: 'bottom left',
    isMenuFixed: false,
    shouldFitContainer: false,
    shouldFlip: true,
    triggerType: 'default',
    onPositioned: () => {},
  };

  state = {
    id: uid({ id: this.constructor.name }),
    autoFocusDropdownItems: false,
  };

  componentDidUpdate = (prevProp: DropdownMenuStatelessProps) => {
    if (this.props.isOpen && !prevProp.isOpen) {
      this.focusFirstItem();
    }
  };

  getNextFocusable = (
    indexItem?: number,
    available?: number,
  ): number | null => {
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

  getPrevFocusable = (
    indexItem?: number,
    available?: number,
  ): number | null => {
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

  focusItem = (index?: number | null) => {
    if (!this.domItemsList || !index) {
      return;
    }

    this.focusedItem = index;
    this.domItemsList[this.focusedItem].focus();
  };

  isTargetChildItem = (target: HTMLElement) => {
    if (!target) {
      return false;
    }

    const isDroplistItem = target.getAttribute('data-role') === 'droplistItem';

    // eslint-disable-next-line react/no-find-dom-node
    const thisDom = findDOMNode(this);
    return isDroplistItem && thisDom ? thisDom.contains(target) : false;
  };

  handleKeyboardInteractionForClosed = (event: KeyboardEvent) => {
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
    event: KeyboardEvent<HTMLElement>,
  ) => {
    if (this.props.isOpen) {
      if (this.isTargetChildItem(event.target as HTMLElement)) {
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

  domMenuContainer: HTMLElement | null = null;

  handleClick(event: MouseEvent) {
    // For any clicks we don't want autofocus
    this.setState({ autoFocusDropdownItems: false });

    if (
      this.triggerContainer &&
      this.triggerContainer.contains(event.target as HTMLElement) &&
      (event.target as HTMLInputElement).disabled !== true
    ) {
      const { isOpen } = this.props;
      this.sourceOfIsOpen = 'mouse';
      this.props.onOpenChange({ isOpen: !isOpen, event });
    }
  }

  handleOpenChange = (args: OnOpenChangeArgs) => {
    this.props.onOpenChange(args);
  };

  triggerContent = () => {
    const {
      children,
      trigger,
      isOpen,
      triggerButtonProps,
      triggerType,
      testId,
    } = this.props;
    const insideTriggerContent = trigger;

    if (triggerType !== 'button') {
      return insideTriggerContent;
    }

    // we probably don't need to object copying
    // ts doesn't like destructuring copy - so converting to object.assign
    const triggerProps = Object.assign({}, triggerButtonProps);
    const defaultButtonProps = {
      'aria-controls': this.state.id,
      'aria-expanded': isOpen,
      'aria-haspopup': true,
      isSelected: isOpen,
    };
    if (!triggerProps.iconAfter && !triggerProps.iconBefore) {
      triggerProps.iconAfter = <ExpandIcon size="medium" label="" />;
    }
    return (
      <Button
        {...defaultButtonProps}
        {...triggerProps}
        testId={testId && `${testId}--trigger`}
      >
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
    if (attrs.source === 'keydown') {
      return;
    }

    if (this.props.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  };

  renderTrigger = () => {
    const triggerContent = this.triggerContent();
    return (
      <div
        ref={(ref) => {
          this.triggerContainer = ref as HTMLElement;
        }}
      >
        {triggerContent}
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

    if (this.props.onPositioned) {
      this.props.onPositioned();
    }
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
    return <>{this.props.children}</>;
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
      shouldFitContainer,
      shouldFlip,
      testId,
    } = this.props;
    const { id } = this.state;

    return (
      <DropdownItemSelectionCache>
        <Droplist
          appearance={appearance}
          boundariesElement={boundariesElement}
          isLoading={isLoading}
          isOpen={isOpen}
          onClick={(e: MouseEvent) => this.handleClick(e)}
          onOpenChange={this.handleOpenChange}
          position={position}
          isMenuFixed={isMenuFixed}
          shouldFitContainer={shouldFitContainer}
          shouldFlip={shouldFlip}
          trigger={this.renderTrigger()}
          onPositioned={this.onDroplistPositioned}
          testId={testId}
        >
          <WidthConstrainer
            id={id}
            role="menu"
            shouldFitContainer={shouldFitContainer}
          >
            <DropdownItemClickManager
              onItemClicked={(event: MouseEvent | KeyboardEvent) =>
                onOpenChange({ isOpen: false, event })
              }
            >
              {this.renderDropdownItems()}
            </DropdownItemClickManager>
          </WidthConstrainer>
        </Droplist>
      </DropdownItemSelectionCache>
    );
  }
}

export { DropdownMenuStateless };

export default DropdownMenuStateless;
