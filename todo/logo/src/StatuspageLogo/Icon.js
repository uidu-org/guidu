// @flow
/* eslint-disable max-len */
import React, { Component } from 'react';
import uuid from 'uuid';

import { type Props, DefaultProps } from '../constants';
import Wrapper from '../Wrapper';

const svg = (iconGradientStart: string, iconGradientStop: string) => {
  const id = uuid();
  return `<canvas height="32" width="32" aria-hidden="true"></canvas>
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
    <defs>
        <linearGradient x1="50%" x2="50%" y1="0%" y2="68.184%" id="${id}">
            <stop stop-color="${iconGradientStart}" ${
    iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : ''
  } offset="0%"></stop>
            <stop stop-color="${iconGradientStop}" offset="100%"></stop>
        </linearGradient>
    </defs>
    <g stroke="none" stroke-width="1" fill-rule="nonzero">
      <ellipse fill="url(#${id})" cx="16.0000005" cy="19.5878182" rx="5.4000001" ry="5.39981818"></ellipse>
      <path d="M3.15511518,12.9260684 L6.43896953,16.7678667 C6.68897511,17.0467148 7.11846411,17.078724 7.40809003,16.8400939 C12.7068784,12.1590845 19.2850452,12.1590845 24.5838335,16.8400939 C24.8734595,17.078724 25.3029485,17.0467148 25.552954,16.7678667 L28.8402944,12.9260684 C29.0719048,12.6494664 29.04914,12.2436871 28.7880038,11.9939938 C21.0838444,5.3353354 10.9080792,5.3353354 3.21786399,11.9939938 C2.9535556,12.2408944 2.92622614,12.6468478 3.15511518,12.9260684 Z" fill="currentColor"></path>
    </g>
  </svg>`;
};

export default class StatuspageIcon extends Component<Props> {
  static defaultProps = DefaultProps;

  render() {
    return <Wrapper {...this.props} svg={svg} />;
  }
}
