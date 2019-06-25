import React, { PureComponent } from 'react';
import StyledMediaCardViewer from './styled';

export default class MediaCardViewer extends PureComponent<any> {
  render() {
    const { children, ...otherProps } = this.props;
    return (
      <StyledMediaCardViewer className="card" {...otherProps}>
        {children}
      </StyledMediaCardViewer>
    );
  }
}
