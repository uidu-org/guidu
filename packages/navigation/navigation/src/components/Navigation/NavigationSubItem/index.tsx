import { lighten } from 'polished';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  StyledNavigationAfter,
  StyledNavigationBefore,
  StyledNavigationItem,
  StyledNavigationText,
} from '../../../styled';

const StyledNavigationLink = styled.a.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 0.25rem;
  color: ${`${lighten(0.2, '#4c566a')} !important`};
  transition: background-color linear 300ms;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 1.25rem;
  font-size: 0.935rem;

  &:hover,
  &.active {
    background-color: rgba(76, 86, 106, 0.085);
    color: #4c566a;
    transition: background-color linear 300ms;
  }
`;

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
