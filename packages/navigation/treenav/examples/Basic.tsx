import React, { Component } from 'react';
import Treenav from '../src';

const items = [
  {
    name: 'test',
    to: '/packages/navigation/treenav',
    component: () => <p>Test</p>,
  },
  {
    name: 'test1',
    to: '/packages/navigation/treenav/test1',
    component: () => (
      <div className="card">
        <div className="card-header">test1</div>
        <div className="card-body">
          <p>Test 1</p>
        </div>
      </div>
    ),
  },
];

export default class Basic extends Component<any, { isCollapsed: boolean }> {
  render() {
    return (
      <Treenav breakpoint={768} items={items}>
        <div>Navigation: </div>
        <div>
          <h3>Content</h3>
          {items.map(({ name, component: ItemComponent }) => (
            <ItemComponent />
          ))}
        </div>
      </Treenav>
    );
  }
}
