import React, { PureComponent } from 'react';
import StyledButton from 'react-bootstrap/Button';

export default class Button extends PureComponent {
  render() {
    console.log(this.props);
    const {
      component,
      // appearance,
      // children,
      withIcon,
      ...otherProps
    } = this.props;

    return (
      <StyledButton
        className={withIcon ? 'd-flex align-items-center' : ''}
        {...otherProps}
      />
    );
  }
}
