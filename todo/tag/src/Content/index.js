// @flow
import React, { Component, type Node, type ComponentType } from 'react';
import styled from 'styled-components';
import { Link, Text, linkStyles } from './styled';
import type { TagColor } from '../types';

type Props = {
  children: Node,
  href?: string,
  isFocused?: boolean,
  isRemovable?: boolean,
  markedForRemoval?: boolean,
  color: TagColor,
  linkComponent?: ComponentType<*>,
};

export default class Content extends Component<Props> {
  getLinkComponent = () => {
    const { linkComponent, href } = this.props;

    if (!href) return null;

    if (linkComponent)
      return styled(linkComponent)`
        ${linkStyles};
      `;
    return Link;
  };

  render() {
    const {
      children,
      href,
      isFocused,
      isRemovable,
      markedForRemoval,
      color,
    } = this.props;
    const styledProps = { isFocused, isRemovable, markedForRemoval, color };

    const LinkComponent = this.getLinkComponent();

    return href && LinkComponent ? (
      <LinkComponent {...styledProps} href={href} tabIndex="-1">
        {children}
      </LinkComponent>
    ) : (
      <Text {...styledProps}>{children}</Text>
    );
  }
}
