'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require('react'));

var _Icon = _interopRequireDefault(require('../cjs/components/Icon'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

var PriorityBlockerIcon = function PriorityBlockerIcon(props) {
  return _react.default.createElement(
    _Icon.default,
    _extends(
      {
        dangerouslySetGlyph:
          '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM6 11a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2H6z" fill="#FF5630"/></svg>',
      },
      props,
    ),
  );
};

PriorityBlockerIcon.displayName = 'PriorityBlockerIcon';
var _default = PriorityBlockerIcon;
exports.default = _default;
