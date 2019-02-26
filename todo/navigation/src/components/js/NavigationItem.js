// @flow
import React, { PureComponent } from 'react';
import type { ComponentType, Node } from 'react';
import { withTheme } from 'styled-components';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import baseItem, { withItemClick, withItemFocus } from '@atlaskit/item';

import {
  name as packageName,
  version as packageVersion,
} from '../../../package.json';
import NavigationItemAction from '../styled/NavigationItemAction';
import NavigationItemAfter from '../styled/NavigationItemAfter';
import NavigationItemCaption from '../styled/NavigationItemCaption';
import NavigationItemIcon from '../styled/NavigationItemIcon';
import NavigationItemTextAfter from '../styled/NavigationItemTextAfter';
import NavigationItemAfterWrapper from '../styled/NavigationItemAfterWrapper';
import { isInOverflowDropdown } from '../../theme/util';

const Item = withItemClick(withItemFocus(baseItem));

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
  action?: Node,
  /** Text to appear to the right of the text. It has a lower font-weight. */
  caption?: string,
  /** Drag and drop props provided by react-beautiful-dnd. Please do not use
   * this unless using react-beautiful-dnd */
  dnd?: DnDType,
  /** Location to link out to on click. This is passed down to the custom link
   component if one is provided. */
  href?: string,
  /** Target frame for item `href` link to be aimed at. */
  target?: string,
  /** React element to appear to the left of the text. This should be an
   @atlaskit/icon component. For accessibility reasons, set the label for the icon to an empty string if providing
   a text prop for this item. */
  icon?: Node,
  /** Element displayed to the right of the item. The dropIcon should generally be
   an appropriate @atlaskit icon, such as the ExpandIcon. */
  dropIcon?: Node,
  /** Makes the navigation item appear with reduced padding and font size. */
  isCompact?: boolean,
  /** Used to apply correct dragging styles when also using react-beautiful-dnd. */
  isDragging?: boolean,
  /** Set whether the item should be highlighted as selected. Selected items have
   a different background color. */
  isSelected?: boolean,
  /** Set whether the item should be used to trigger a dropdown. If this is true,
   The href property will be disabled. */
  isDropdownTrigger?: boolean,
  /** Component to be used as link, if default link component does not suit, such
  as if you are using a different router. Component is passed a href prop, and the content
  of the title as children. Any custom link component must accept a className prop so that
  it can be styled. */
  linkComponent?: ComponentType<any>,
  /** Function to be called on click. This is passed down to a custom link component,
   if one is provided.  */
  onClick?: (?MouseEvent) => void,
  /** Function to be called on click. This is passed down to a custom link component,
   if one is provided.  */
  onKeyDown?: (e: KeyboardEvent) => void,
  /** Standard onmouseenter event */
  onMouseEnter?: (e: MouseEvent) => void,
  /** Standard onmouseleave event */
  onMouseLeave?: (e: MouseEvent) => void,
  /** Text to be shown alongside the main `text`. */
  subText?: ?string,
  /** Main text to be displayed as the item. Accepts a react component but in most
   cases this should just be a string. */
  text?: Node,
  /** React component to be placed to the right of the main text. */
  textAfter?: Node,
  /** Whether the Item should attempt to gain browser focus when mounted */
  autoFocus?: boolean,
};

class NavigationItem extends PureComponent<Props> {
  static defaultProps = {
    isSelected: false,
    isDropdownTrigger: false,
    autoFocus: false,
  };

  render() {
    const icon = this.props.icon ? (
      <NavigationItemIcon>{this.props.icon}</NavigationItemIcon>
    ) : null;

    const dropIcon =
      this.props.dropIcon && this.props.isDropdownTrigger ? (
        <NavigationItemIcon isDropdownTrigger>
          {this.props.dropIcon}
        </NavigationItemIcon>
      ) : null;

    const textAfter = this.props.textAfter ? (
      <NavigationItemTextAfter>{this.props.textAfter}</NavigationItemTextAfter>
    ) : null;

    const action = this.props.action ? (
      <NavigationItemAction>{this.props.action}</NavigationItemAction>
    ) : null;

    const after = this.props.textAfter ? (
      <NavigationItemAfter
        shouldTakeSpace={this.props.action || this.props.textAfter}
        isDropdownTrigger={this.props.isDropdownTrigger}
      >
        {textAfter}
      </NavigationItemAfter>
    ) : null;

    // There are various 'after' elements which are all optional. If any of them are present we
    // render those inside a shared wrapper.
    const allAfter =
      after || dropIcon || action ? (
        <NavigationItemAfterWrapper>
          {after}
          {dropIcon}
          {action}
        </NavigationItemAfterWrapper>
      ) : null;

    const wrappedCaption = this.props.caption ? (
      <NavigationItemCaption>{this.props.caption}</NavigationItemCaption>
    ) : null;

    const interactiveWrapperProps = {
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      href: this.props.href,
      linkComponent: this.props.linkComponent,
    };

    // Theme prop is provided via withTheme(...) and is not public API
    /* eslint-disable react/prop-types */
    // $FlowFixMe
    const role = isInOverflowDropdown(this.props.theme) ? 'menuitem' : null;
    /* eslint-enable react/prop-types */

    return (
      <Item
        elemBefore={icon}
        elemAfter={allAfter}
        description={this.props.subText}
        isSelected={this.props.isSelected}
        isDragging={this.props.isDragging}
        isDropdown={this.props.isDropdownTrigger}
        isCompact={this.props.isCompact}
        dnd={this.props.dnd}
        autoFocus={this.props.autoFocus}
        target={this.props.target}
        role={role}
        {...interactiveWrapperProps}
      >
        {this.props.text}
        {wrappedCaption}
      </Item>
    );
  }
}

export const NavigationItemWithoutAnalytics = withTheme(NavigationItem);
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'navigationItem',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onClick: createAndFireEventOnAtlaskit({
      action: 'clicked',
      actionSubject: 'navigationItem',

      attributes: {
        componentName: 'navigationItem',
        packageName,
        packageVersion,
      },
    }),
  })(NavigationItemWithoutAnalytics),
);
