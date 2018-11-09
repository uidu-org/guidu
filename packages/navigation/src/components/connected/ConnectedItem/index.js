// @flow

import React, { Component } from 'react';

import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import BoardIcon from '@atlaskit/icon/glyph/board';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import GraphLineIcon from '@atlaskit/icon/glyph/graph-line';
import FolderIcon from '@atlaskit/icon/glyph/folder';
import IssuesIcon from '@atlaskit/icon/glyph/issues';
import ShipIcon from '@atlaskit/icon/glyph/ship';

import GoToItem from '../GoToItem';
import PresentationalItem from '../../presentational/Item';
import type { ConnectedItemProps } from './types';

export const iconMap = {
  ArrowRightIcon,
  BacklogIcon,
  BoardIcon,
  DashboardIcon,
  GraphLineIcon,
  FolderIcon,
  IssuesIcon,
  ShipIcon,
};

export default class ConnectedItem extends Component<ConnectedItemProps> {
  render() {
    const { before: beforeProp, icon, ...rest } = this.props;
    let before = beforeProp;
    if (!before && typeof icon === 'string' && iconMap[icon]) {
      before = iconMap[icon];
    }

    const props = { ...rest, before };
    return props.goTo ? (
      <GoToItem {...props} />
    ) : (
      <PresentationalItem {...props} />
    );
  }
}
