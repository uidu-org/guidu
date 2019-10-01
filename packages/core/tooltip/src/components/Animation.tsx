import React from 'react';
import { Transition } from 'react-transition-group';
import { PositionTypeBase } from '../types';

const ENTER_DURATION = 120;
const EXIT_DURATION = 80;
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)'; // easeOutQuint
const distance = 8;

const horizontalOffset = {
  left: distance,
  right: -distance,
  top: 0,
  bottom: 0,
};
const verticalOffset = {
  bottom: -distance,
  top: distance,
  left: 0,
  right: 0,
};

interface Timeout {
  enter: number;
  exit: number;
}

type TransitionStates = 'entering' | 'entered' | 'exiting';

const defaultStyle = (timeout: Timeout) => ({
  transition: `transform ${timeout.enter}ms ${easing}, opacity ${timeout.enter}ms linear`,
  opacity: 0,
});

const transitionStyle = (
  timeout: Timeout,
  state: TransitionStates,
  position: PositionTypeBase,
) => {
  const transitions: { [key in TransitionStates]: any } = {
    entering: {
      transform: `translate3d(${horizontalOffset[position]}px, ${verticalOffset[position]}px, 0)`,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 0,
      transition: `${timeout.exit}ms linear`,
      transform: `translate3d(${horizontalOffset[position] /
        2}px, ${verticalOffset[position] / 2}px, 0)`,
    },
  };
  return transitions[state];
};

const getStyle = (timeout: Timeout, state: TransitionStates) => (
  position: PositionTypeBase,
) => ({
  ...defaultStyle(timeout),
  ...transitionStyle(timeout, state, position),
});

type GetAnimationStyles = (position: PositionTypeBase) => Object;

interface AnimationProps {
  children: (getAnimationFn: GetAnimationStyles) => React.ReactNode;
  immediatelyHide: boolean;
  immediatelyShow: boolean;
  in: boolean;
  onExited: () => any;
}

const Animation = ({
  children,
  immediatelyHide,
  immediatelyShow,
  onExited,
  in: inProp,
}: AnimationProps) => {
  const timeout = {
    enter: immediatelyShow ? 1 : ENTER_DURATION,
    exit: immediatelyHide ? 1 : EXIT_DURATION,
  };
  return (
    <Transition
      timeout={timeout}
      in={inProp}
      onExited={onExited}
      unmountOnExit
      appear
    >
      {(state: TransitionStates) => children(getStyle(timeout, state))}
    </Transition>
  );
};

export default Animation;
