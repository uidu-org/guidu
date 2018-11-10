import { keyframes } from 'emotion';
import { transitionDuration, transitionTimingFunction } from '../../../common/constants';
var enterAnimationDown = keyframes(["\n  from { transform: translateX(100%); }\n  to { transform: translateX(0%); }\n"]);
var enterAnimationUp = keyframes(["\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0%); }\n"]);
var exitAnimationDown = keyframes(["\n  from { transform: translateX(0); }\n  to { transform: translateX(-100%); }\n"]);
var exitAnimationUp = keyframes(["\n  from { transform: translateX(0); }\n  to { transform: translateX(100%); }\n"]);
export default (function (_ref) {
  var state = _ref.state,
      traversalDirection = _ref.traversalDirection;

  if (!['entering', 'exiting'].includes(state) || !traversalDirection) {
    return {};
  }

  if (state === 'exiting') {
    var animationName = traversalDirection === 'down' ? exitAnimationDown : exitAnimationUp;
    return {
      animationName: animationName,
      animationDuration: transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: transitionTimingFunction
    };
  }

  if (state === 'entering') {
    var _animationName = traversalDirection === 'down' ? enterAnimationDown : enterAnimationUp;

    return {
      animationName: _animationName,
      animationDuration: transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: transitionTimingFunction,
      position: 'absolute',
      width: '100%',
      zIndex: 1
    };
  }

  return {};
});