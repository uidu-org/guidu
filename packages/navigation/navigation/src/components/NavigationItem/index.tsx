import React, { PureComponent } from 'react';
import {
  StyledNavigationAfter,
  StyledNavigationBefore,
  StyledNavigationItem,
  StyledNavigationLink,
  StyledNavigationText,
} from './styled';

export default class NavigationItem extends PureComponent<any> {
  static defaultProps = {
    before: null,
    after: null,
  };

  render() {
    const { text, before, after, ...otherProps } = this.props;
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
}
