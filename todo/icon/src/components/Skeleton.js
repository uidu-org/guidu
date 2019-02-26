// @flow

import React, { Component } from 'react';

import StyledSkeleton from '../styled/Skeleton';
import type { sizeOpts } from '../types';

type Props = {
  /* Sets the color of the skeleton. By default it will inherit the current text color. */
  color?: string,
  /* Controls the size of the skeleton */
  size: sizeOpts,
  /* Determines the opacity of the skeleton */
  weight: 'normal' | 'strong',
};

export default class Skeleton extends Component<Props> {
  static defaultProps = {
    size: 'medium',
    weight: 'normal',
  };

  render() {
    return <StyledSkeleton {...this.props} />;
  }
}
