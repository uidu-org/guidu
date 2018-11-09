// @flow

import { keyframes } from 'emotion';

import {
  transitionDuration,
  transitionTimingFunction,
} from '../../../common/constants';

const enterAnimationDown = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0%); }
`;

const enterAnimationUp = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0%); }
`;

const exitAnimationDown = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const exitAnimationUp = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

type GetTransitionStylesArgs = {
  state: 'entering' | 'entered' | 'exiting' | 'exited',
  traversalDirection: 'up' | 'down' | null,
};

export default ({
  state,
  traversalDirection,
}: GetTransitionStylesArgs): { animationName?: string } => {
  if (!['entering', 'exiting'].includes(state) || !traversalDirection) {
    return {};
  }

  if (state === 'exiting') {
    const animationName =
      traversalDirection === 'down' ? exitAnimationDown : exitAnimationUp;
    return {
      animationName,
      animationDuration: transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: transitionTimingFunction,
    };
  }

  if (state === 'entering') {
    const animationName =
      traversalDirection === 'down' ? enterAnimationDown : enterAnimationUp;
    return {
      animationName,
      animationDuration: transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: transitionTimingFunction,
      position: 'absolute',
      width: '100%',
      zIndex: 1,
    };
  }

  return {};
};
