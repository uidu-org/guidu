// @flow

import React, { Component, type Node } from 'react';
import SizeDetector from '@atlaskit/size-detector';
import rafSchd from 'raf-schd';

type Props = {
  children: Node,
  onHeightChange: (height: number) => void,
};

export default class HeightDetector extends Component<Props> {
  notifyHeight = rafSchd(height => {
    this.props.onHeightChange(height);
  });

  render() {
    return (
      <SizeDetector>
        {size => {
          this.notifyHeight(size.height);
          return this.props.children;
        }}
      </SizeDetector>
    );
  }
}
