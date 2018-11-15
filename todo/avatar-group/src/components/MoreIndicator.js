// @flow
/* eslint-disable react/no-unused-prop-types, react/prop-types, react/sort-comp */

import React, { Component } from 'react';
import { withPseudoState, getProps, type SizeType } from '@atlaskit/avatar';
import { Outer, Inner } from '../styled/MoreIndicator';

export type Props = {
  /** Used to override the default border color of the presence indicator.
   Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string,
  /** The total number excess of avatars */
  count: number,
  /** When true, provides a gutter for the adjacent avatar */
  isStack?: boolean,
  /** Handle user interaction */
  onClick?: () => mixed,
  /** Defines the size of the indicator */
  size?: SizeType,
  /** TODO */
  appearance?: string,
  isActive?: boolean,
  isFocus?: boolean,
  isHover?: boolean,
};

const MAX_DISPLAY_COUNT = 99;

class MoreIndicator extends Component<Props> {
  static defaultProps = {
    appearance: 'circle',
  };
  render() {
    const { count } = this.props;
    const outerProps = getProps(this);
    const { appearance, isActive, isFocus, isHover, size } = this.props;

    const innerProps = { appearance, isActive, isFocus, isHover, size };
    const displayCount = count > MAX_DISPLAY_COUNT ? MAX_DISPLAY_COUNT : count;

    return (
      <Outer {...outerProps} isInteractive>
        <Inner {...innerProps}>+{displayCount}</Inner>
      </Outer>
    );
  }
}

export default withPseudoState(MoreIndicator);
