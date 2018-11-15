import React, { PureComponent } from 'react';
import { Button as StyledButton } from 'reactstrap';

export default class Button extends PureComponent {
  render() {
    const {
      component,
      appearance,
      children,
      withIcon,
      ...otherProps
    } = this.props;
    return (
      <StyledButton
        className={withIcon ? 'd-flex align-items-center' : ''}
        tag={component || 'button'}
        children={children}
        {...otherProps}
      />
    );
  }
}
