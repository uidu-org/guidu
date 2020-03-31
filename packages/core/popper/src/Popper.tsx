import memoizeOne from 'memoize-one';
import React from 'react';
import {
  Popper as ReactPopper,
  PopperChildrenProps,
  PopperProps,
} from 'react-popper';
import { Placement } from './types';

export { Manager, Reference } from 'react-popper';

interface State {}

export interface Props {
  /** Returns the element to be positioned */
  children: (childrenProps: PopperChildrenProps) => React.ReactNode;
  /** Formatted like "0, 8px" — how far to offset the Popper from the Reference. Changes automatically based on the placement */
  offset: [number, number];
  /** Which side of the Reference to show on. */
  placement: Placement;
  /** Replacement reference element to position popper relative to */
  referenceElement?: HTMLElement;
  /** Additional modifiers and modifier overwrites */
  modifiers?: PopperProps['modifiers'];
}

type Position = 'top' | 'right' | 'bottom' | 'left';

const FlipBehavior: { [index: string]: Position[] } = {
  auto: [],
  top: ['top', 'bottom', 'top'],
  right: ['right', 'left', 'right'],
  bottom: ['bottom', 'top', 'bottom'],
  left: ['left', 'right', 'left'],
};

const getFlipBehavior = (side: string): Position[] => FlipBehavior[side];

export class Popper extends React.Component<Props, State> {
  static defaultProps: Props = {
    children: () => null,
    offset: [0, 8],
    placement: 'bottom-start',
  };

  getModifiers = memoizeOne(
    (placement: Placement): PopperProps['modifiers'] => {
      const flipBehavior = getFlipBehavior(placement.split('-')[0]);
      const modifiers: PopperProps['modifiers'] = [
        {
          name: 'flip',
          enabled: true,
          options: {
            behavior: flipBehavior,
            boundariesElement: 'viewport',
          },
        },
        { name: 'hide', enabled: true },
        {
          name: 'offset',
          enabled: true,
          options: { offset: this.props.offset },
        },
        {
          name: 'preventOverflow',
          enabled: true,
          options: {
            escapeWithReference: false,
            boundariesElement: 'window',
          },
        },
      ];

      if (this.props.modifiers) {
        return { ...modifiers, ...this.props.modifiers };
      }

      return modifiers;
    },
  );

  render() {
    const { placement, children, referenceElement } = this.props;
    const modifiers: PopperProps['modifiers'] = this.getModifiers(
      this.props.placement,
    );

    return (
      <ReactPopper
        strategy="fixed"
        modifiers={modifiers}
        placement={placement}
        {...(referenceElement ? { referenceElement } : {})}
      >
        {children}
      </ReactPopper>
    );
  }
}
