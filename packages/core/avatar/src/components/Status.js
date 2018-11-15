// @flow

import React, { Component, type Node } from 'react';
import { Inner, Outer } from '../styled/Icon';
import getStatusSVG from '../helpers/getStatusSVG';
import type { StatusType, SizeType } from '../types';

type Props = {
  /** Used to override the default border color of the status indicator.
   Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string | (() => mixed),
  /** Content to use as a custom status indicator (usually not required if
   consuming Status separate to Avatar). */
  children?: Node,
  /** Content to use as a custom status indicator (usually not required if
   consuming Status separate to Avatar). */
  status?: StatusType,
  /** Defines the size of the status. */
  size?: SizeType,
};

export default class Status extends Component<Props> {
  render() {
    const { borderColor, children, status, size } = this.props;

    return (
      <Outer size={size} bgColor={borderColor}>
        <Inner>{children || (status && getStatusSVG(status))}</Inner>
      </Outer>
    );
  }
}
