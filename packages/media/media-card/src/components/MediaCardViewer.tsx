import React, { PureComponent } from 'react';

export default class MediaCardViewer extends PureComponent<any> {
  render() {
    const { children, ...otherProps } = this.props;
    return (
      <div
        className="card"
        style={{ width: '300px', height: '128px' }}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}
