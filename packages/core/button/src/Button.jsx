import React, { PureComponent } from 'react';
import StyledButton from 'react-bootstrap/Button';

export default class Button extends PureComponent {
  render() {
    const {
      // component,
      // appearance,
      // children,
      // withIcon,
      ...otherProps
    } = this.props;
    return (
      <StyledButton
        // className={withIcon ? 'd-flex align-items-center' : ''}
        // tag={component || 'button'}
        {...otherProps}
      />
    );
  }
}
