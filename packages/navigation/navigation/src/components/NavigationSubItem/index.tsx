import React, { PureComponent } from 'react';
import {
  StyledNavigationAfter,
  StyledNavigationBefore,
  StyledNavigationItem,
  StyledNavigationText,
} from '../NavigationItem/styled';
import { StyledNavigationLink } from './styled';

export default class NavigationSubItem extends PureComponent<any> {
  static defaultProps = {
    before: null,
    after: null,
  };

  render() {
    const { text, before, after, visible, ...otherProps } = this.props;
    if (visible) {
      return (
        <StyledNavigationItem>
          <StyledNavigationLink {...otherProps}>
            {!!before && (
              <StyledNavigationBefore>{before}</StyledNavigationBefore>
            )}
            <StyledNavigationText>{text}</StyledNavigationText>
            {!!after && <StyledNavigationAfter>{after}</StyledNavigationAfter>}
          </StyledNavigationLink>
        </StyledNavigationItem>
      );
    }
    return null;
  }
}
