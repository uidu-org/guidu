import React, { PureComponent } from 'react';
import {
  StyledNavigationIconItem,
  StyledNavigationIconItemIcon,
  StyledNavigationIconLink,
  StyledNavigationText,
} from './styled';

export default class NavigationIconItem extends PureComponent<any> {
  static defaultProps = {};

  render() {
    const { text, icon, ...otherProps } = this.props;
    return (
      <StyledNavigationIconItem>
        <StyledNavigationIconLink {...otherProps}>
          {!!icon && (
            <StyledNavigationIconItemIcon>{icon}</StyledNavigationIconItemIcon>
          )}
          <StyledNavigationText>{text}</StyledNavigationText>
        </StyledNavigationIconLink>
      </StyledNavigationIconItem>
    );
  }
}
