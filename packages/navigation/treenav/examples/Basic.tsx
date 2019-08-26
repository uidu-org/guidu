import React, { Component } from 'react';
import Treenav from '../src';

export default class Basic extends Component<any, { isCollapsed: boolean }> {
  render() {
    return (
      <Treenav
        breakpoint={768}
        items={[
          { to: 'test', component: () => <p>Test</p>, name: 'test' },
          { to: 'test1', component: () => <p>Test1</p>, name: 'test1' },
        ]}
      />
    );
  }
}
