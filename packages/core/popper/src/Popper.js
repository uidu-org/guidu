// @flow
import React, { Component, type Node } from 'react';
import memoizeOne from 'memoize-one';
import {
  Popper as ReactPopper,
  type PopperChildrenProps,
  type PopperProps,
} from 'react-popper';
import type { Placement } from './types';

export { Manager, Reference } from 'react-popper';

type State = {};

type Props = {
  /** Returns the element to be positioned */
  children: PopperChildrenProps => Node,
  /** Formatted like "0, 8px" — how far to offset the Popper from the Reference. Changes automatically based on the placement */
  offset: number | string,
  /** Which side of the Reference to show on. */
  placement: Placement,
  /** Replacement reference element to position popper relative to */
  referenceElement?: HTMLElement,
};

const getFlipBehavior = (side: string) =>
  ({
    auto: [],
    top: ['top', 'bottom', 'top'],
    right: ['right', 'left', 'right'],
    bottom: ['bottom', 'top', 'bottom'],
    left: ['left', 'right', 'left'],
  }[side]);

export class Popper extends Component<Props, State> {
  static defaultProps: Props = {
    children: () => {},
    offset: '0, 8px',
    placement: 'bottom-start',
  };

  getModifiers = memoizeOne(
    (placement: Placement): $ElementType<PopperProps, 'modifiers'> => {
      const flipBehavior = getFlipBehavior(placement.split('-')[0]);
      const modifiers: $ElementType<PopperProps, 'modifiers'> = {
        flip: {
          enabled: true,
          behavior: flipBehavior,
          boundariesElement: 'viewport',
        },
        hide: {
          enabled: true,
          boundariesElement: 'scrollParent',
        },
        offset: {
          enabled: true,
          offset: this.props.offset,
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: 'window',
        },
      };

      return modifiers;
    },
  );

  render() {
    const { placement, children, referenceElement } = this.props;
    const modifiers: $ElementType<PopperProps, 'modifiers'> = this.getModifiers(
      this.props.placement,
    );

    return (
      <ReactPopper
        positionFixed
        modifiers={modifiers}
        placement={placement}
        {...(referenceElement ? { referenceElement } : {})}
      >
        {children}
      </ReactPopper>
    );
  }
}
