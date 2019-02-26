// @flow
import React, { Component } from 'react';

import { Skeleton as SkeletonIcon } from '@atlaskit/icon';

import { HiddenWhenCollapsed } from './ToggleWhenCollapsed';

import SkeletonContainerItemWrapper from './styled/SkeletonContainerItemWrapper';
import SkeletonContainerItemText from './styled/SkeletonContainerItemText';
import SkeletonIconWrapper from './styled/SkeletonIconWrapper';

type Props = {
  isCollapsed?: boolean,
  itemTextWidth?: string,
};

export default class SkeletonContainerItem extends Component<Props> {
  static defaultProps = {
    isCollapsed: false,
  };

  render() {
    return (
      <SkeletonContainerItemWrapper>
        <SkeletonIconWrapper>
          <SkeletonIcon />
        </SkeletonIconWrapper>
        <HiddenWhenCollapsed isCollapsed={this.props.isCollapsed}>
          <SkeletonContainerItemText textWidth={this.props.itemTextWidth} />
        </HiddenWhenCollapsed>
      </SkeletonContainerItemWrapper>
    );
  }
}
