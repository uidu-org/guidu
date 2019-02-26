// @flow
import React, { PureComponent, type ElementRef, type Node } from 'react';
import SpacerInner from '../styled/SpacerInner';

type Props = {
  children?: Node,
  innerRef?: (ref: ElementRef<*>) => void,
  onTransitionEnd?: (e: TransitionEvent) => void,
  shouldAnimate: boolean,
  width: number,
};

export default class Spacer extends PureComponent<Props> {
  static defaultProps = {
    shouldAnimate: false,
    width: 0,
  };
  render() {
    const {
      children,
      innerRef,
      onTransitionEnd,
      shouldAnimate,
      width,
    } = this.props;

    return (
      <SpacerInner
        innerRef={innerRef}
        onTransitionEnd={onTransitionEnd}
        shouldAnimate={shouldAnimate}
        style={{ width }}
      >
        {children}
      </SpacerInner>
    );
  }
}
