import loadable from '@loadable/component';
import React, { Component } from 'react';

const Table = loadable(() => import('./Table'));

export default class Context extends Component<any> {
  render() {
    return <Table {...this.props} />;
  }
}
