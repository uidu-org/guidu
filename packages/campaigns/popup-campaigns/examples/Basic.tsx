import React, { PureComponent } from 'react';
import { Bar, Floating, Popup, Takeover } from '..';

export default class Basic extends PureComponent {
  render() {
    return (
      <>
        <Popup />
        <Takeover />
        <Floating />
        <Bar />
      </>
    );
  }
}
