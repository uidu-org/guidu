// @flow
import React, { Component } from 'react';
import { WithRootTheme } from '../../../theme/util';
import type { Provided } from '../../../theme/types';

import SkeletonGlobalTopItems from './SkeletonGlobalTopItems';
import SkeletonGlobalBottomItems from './SkeletonGlobalBottomItems';

import SkeletonGlobalNavigationInner from './styled/SkeletonGlobalNavigationInner';
import SkeletonNavigationContentOuter from './styled/SkeletonNavigationContentOuter';

export type Props = {
  isCollapsed: boolean,
  theme: Provided,
};

export default class SkeletonGlobalNavigation extends Component<Props> {
  static defaultProps = {
    isCollapsed: false,
  };

  render() {
    return (
      <WithRootTheme
        provided={this.props.theme}
        isCollapsed={this.props.isCollapsed}
      >
        <SkeletonGlobalNavigationInner>
          <SkeletonNavigationContentOuter>
            <SkeletonGlobalTopItems />
            <SkeletonGlobalBottomItems />
          </SkeletonNavigationContentOuter>
        </SkeletonGlobalNavigationInner>
      </WithRootTheme>
    );
  }
}
