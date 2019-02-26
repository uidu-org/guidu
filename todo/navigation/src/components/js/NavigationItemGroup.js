// @flow
import React, { Component, type Node, type ElementRef } from 'react';
import { ItemGroup } from '@atlaskit/item';
import NavigationItemGroupTitle from '../styled/NavigationItemGroupTitle';
import NavigationItemGroupSeparator from '../styled/NavigationItemGroupSeparator';
import NavigationItemGroupHeader from '../styled/NavigationItemGroupHeader';
import NavigationItemGroupAction from '../styled/NavigationItemGroupAction';

type Props = {
  /** React element to be displayed to the right of the group header. */
  action?: Node,
  /** React Elements to be displayed within the group. This should generally be
   a collection of NavigationItems. */
  children?: Node,
  /** Set whether the text should be compacted. */
  isCompact?: boolean,
  /** Set whether a separator should appear above the group. */
  hasSeparator?: boolean,
  /** Text to appear as heading above group. Will be auto-capitalised. */
  title?: string,
  /** A function that returns the DOM ref created by the group */
  innerRef?: (ElementRef<*>) => void,
};

export default class NavigationItemGroup extends Component<Props> {
  static defaultProps = {
    isCompact: false,
    hasSeparator: false,
  };

  render() {
    const {
      title,
      action,
      isCompact,
      hasSeparator,
      children,
      innerRef,
    } = this.props;

    const wrappedTitle = title ? (
      <NavigationItemGroupTitle>{title}</NavigationItemGroupTitle>
    ) : null;

    const wrappedAction = action ? (
      <NavigationItemGroupAction>{action}</NavigationItemGroupAction>
    ) : null;

    const separator = hasSeparator ? <NavigationItemGroupSeparator /> : null;

    const header =
      title || action ? (
        <NavigationItemGroupHeader>{wrappedTitle}</NavigationItemGroupHeader>
      ) : null;

    const groupHeading =
      separator || header ? (
        <div>
          {separator}
          {header}
        </div>
      ) : null;

    return (
      <ItemGroup
        title={groupHeading}
        elemAfter={wrappedAction}
        isCompact={isCompact}
        innerRef={innerRef}
      >
        {children}
      </ItemGroup>
    );
  }
}
