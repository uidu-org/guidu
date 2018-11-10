"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _emotion = require("emotion");

var _constants = require("../../../common/constants");

var enterAnimationDown = (0, _emotion.keyframes)(["\n  from { transform: translateX(100%); }\n  to { transform: translateX(0%); }\n"]);
var enterAnimationUp = (0, _emotion.keyframes)(["\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0%); }\n"]);
var exitAnimationDown = (0, _emotion.keyframes)(["\n  from { transform: translateX(0); }\n  to { transform: translateX(-100%); }\n"]);
var exitAnimationUp = (0, _emotion.keyframes)(["\n  from { transform: translateX(0); }\n  to { transform: translateX(100%); }\n"]);

var _default = function _default(_ref) {
  var state = _ref.state,
      traversalDirection = _ref.traversalDirection;

  if (!['entering', 'exiting'].includes(state) || !traversalDirection) {
    return {};
  }

  if (state === 'exiting') {
    var animationName = traversalDirection === 'down' ? exitAnimationDown : exitAnimationUp;
    return {
      animationName: animationName,
      animationDuration: _constants.transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: _constants.transitionTimingFunction
    };
  }

  if (state === 'entering') {
    var _animationName = traversalDirection === 'down' ? enterAnimationDown : enterAnimationUp;

    return {
      animationName: _animationName,
      animationDuration: _constants.transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: _constants.transitionTimingFunction,
      position: 'absolute',
      width: '100%',
      zIndex: 1
    };
  }

  return {};
};

exports.default = _default;
module.exports = exports.default;