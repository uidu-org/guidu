import React, { Component } from 'react';
import { Members, Navigator } from '../src';

export default class Basic extends Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      label: 'Current period',
    };
  }

  render() {
    const { label } = this.state;
    return (
      <div className="d-flex align-items-center p-3 justify-content-between">
        <Navigator
          onPrev={() => this.setState({ label: 'Previous period' })}
          label={label}
          onNext={() => this.setState({ label: 'Next period' })}
        />
        <Members />
      </div>
    );
  }
}
