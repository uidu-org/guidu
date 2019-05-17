import React, { Component } from 'react';

export default class DataControls extends Component<any> {
  render() {
    const { children } = this.props;
    return <div className="d-flex p-3">{children}</div>;
  }
}
