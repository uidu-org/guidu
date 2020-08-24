import React, { PureComponent } from 'react';
import {
  StyledNavigationIconItemIcon,
  StyledNavigationIconLink,
} from './styled';

export default class NavigationIconItem extends PureComponent<any> {
  static defaultProps = {};

  render() {
    const { text, icon, ...otherProps } = this.props;
    return (
      <StyledNavigationIconLink actionsCount={0} {...otherProps}>
        {!!icon && (
          <StyledNavigationIconItemIcon>{icon}</StyledNavigationIconItemIcon>
        )}
      </StyledNavigationIconLink>
    );
  }
}
