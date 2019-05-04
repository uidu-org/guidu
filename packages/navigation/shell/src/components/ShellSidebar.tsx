import React, { PureComponent } from 'react';
import { Sidebar } from '../styled';

export default class Shell extends PureComponent<any> {
  render() {
    return <Sidebar {...this.props} className="d-none d-lg-flex" />;
  }
}
