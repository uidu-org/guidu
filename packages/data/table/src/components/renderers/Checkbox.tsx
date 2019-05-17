import React, { Component } from 'react';
import { CheckSquare } from 'react-feather';

export default class Checkbox extends Component<any> {
  render() {
    const { value } = this.props;
    return value === 'admin' ? <CheckSquare size={16} /> : null;
  }
}
