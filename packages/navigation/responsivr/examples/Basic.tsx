import React, { Component } from 'react';
import Responsivr from '../src';

export default class Basic extends Component<any> {
  render() {
    return (
      <Responsivr
        sm={<p>Show this from small devices up</p>}
        md={<p>Show this from medium devices up</p>}
        lg={<p>Show this for lg devices</p>}
        xl={<p>Show this for xl devices</p>}
      >
        <p>Default is mobile view</p>
      </Responsivr>
    );
  }
}
