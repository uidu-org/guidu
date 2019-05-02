import React, { Component } from 'react';
import Responsivr from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <Responsivr
        md={<p>Show this from medium devices up</p>}
        lg={<p>Show this for lg devices</p>}
      >
        <p>Default is mobile view</p>
      </Responsivr>
    );
  }
}
