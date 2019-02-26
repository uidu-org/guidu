// @flow

import React, { PureComponent } from 'react';
import { Link } from './styled';
import type { Stage } from '../types';

type Props = {
  /** stage data passed to each `ProgressTrackerStage` component */
  item: Stage & ProgressTrackerLinkStageAdditionalProps,
};

type ProgressTrackerLinkStageAdditionalProps = {
  href?: string,
  onClick?: () => void,
};

export default class ProgressTrackerLink extends PureComponent<Props> {
  render() {
    const { href, onClick, label } = this.props.item;
    return (
      <Link href={href} onClick={onClick}>
        {label}
      </Link>
    );
  }
}
