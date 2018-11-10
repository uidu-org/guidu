// @flow

import React, { Component } from 'react';
import ArrowLeftCircleIcon from '@atlaskit/icon/glyph/arrow-left-circle';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import ConnectedItem from '../ConnectedItem';
import type { BackItemProps } from './types';

const gridSize = gridSizeFn();

const ArrowLeft = () => (
  <ArrowLeftCircleIcon primaryColor="currentColor" secondaryColor="inherit" />
);

export default class BackItem extends Component<BackItemProps> {
  static defaultProps = {
    text: 'Back',
  };
  render() {
    const { before: beforeProp, text, ...props } = this.props;
    let before = beforeProp;
    if (!before) {
      before = ArrowLeft;
    }

    return (
      <div css={{ paddingBottom: gridSize * 2 }}>
        <ConnectedItem {...props} after={null} before={before} text={text} />
      </div>
    );
  }
}
