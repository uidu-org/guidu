// @flow

import React, { Component } from 'react';

import { gridSize as gridSizeFn } from '@atlaskit/theme';
import type { SectionHeadingProps } from './types';

const gridSize = gridSizeFn();

export default class SectionHeading extends Component<SectionHeadingProps> {
  render() {
    const { children } = this.props;
    return (
      <div
        css={{
          alignItems: 'center',
          color: 'inherit',
          display: 'flex',
          flexShrink: 0,
          fontSize: 'inherit',
          fontWeight: 600,
          height: gridSize * 5.5,
          paddingLeft: gridSize * 1.5,
          paddingRight: gridSize * 1.5,
          paddingTop: gridSize,
        }}
      >
        {children}
      </div>
    );
  }
}
