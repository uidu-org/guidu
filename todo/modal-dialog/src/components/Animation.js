// @flow
import React, { type Node } from 'react';
import { Transition } from 'react-transition-group';

const duration = 500;
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'; // easeOutQuint
const verticalOffset = 16;

// Animation
// ==============================
// Modal has two parts that need to be animated. Everything should fade in/out
// and the popup should slide up/up (sic). These animations happen at the same time.
// This component calls it's children with the styles for both animations.

type AnimationProps = {
  in: boolean,
  onExited?: HTMLElement => void,
  onEntered?: (HTMLElement, boolean) => void,
  stackIndex?: number,
  children: ({ fade: Object, slide: Object }) => Node,
};

export const Animation = ({
  in: hasEntered,
  stackIndex = 0,
  onExited,
  onEntered,
  children,
}: AnimationProps) => (
  <Transition
    in={hasEntered}
    timeout={{ enter: 0, exit: duration }}
    onExited={onExited}
    onEntered={onEntered}
    appear
  >
    {unadjustedStatus => {
      // when we first render, we want to finish the 'entering' state render
      // then jump to the 'entered' state as quick as possible.
      const adjustedStatus =
        hasEntered && unadjustedStatus === 'exited'
          ? 'entering'
          : unadjustedStatus;
      // Fade styles
      const fadeBase = {
        transition: `opacity ${duration / 2}ms`,
        opacity: 1,
      };
      const fadeTransitions = {
        entering: {
          opacity: 0,
        },
        exiting: {
          opacity: 0,
        },
      };
      // Slide styles
      const slideBase = {
        transition: `transform ${duration}ms ${easing}`,
        transform: `translate3d(0, ${verticalOffset * 2}px, 0)`,
      };
      const slideTransitions = {
        entering: {},
        entered: {
          transform:
            stackIndex > 0
              ? `translate3d(0, ${stackIndex * (verticalOffset / 2)}px, 0)`
              : null,
        },
        exiting: {
          transform: `translate3d(0, -${verticalOffset * 2}px, 0)`,
        },
      };
      return children({
        fade: { ...fadeBase, ...fadeTransitions[adjustedStatus] },
        slide: { ...slideBase, ...slideTransitions[adjustedStatus] },
      });
    }}
  </Transition>
);
