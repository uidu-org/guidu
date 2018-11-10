"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _theme = require("@atlaskit/theme");

var gridSize = (0, _theme.gridSize)();
var scrollHintHeight = 2;
var scrollHintSpacing = gridSize * 2;
var isGecko = typeof window !== 'undefined' && window.navigator.userAgent.indexOf('Gecko') >= 0;
var isWebkit = typeof window !== 'undefined' && window.navigator.userAgent.indexOf('AppleWebKit') >= 0;
var scrollBarSize = isGecko || isWebkit ? 0 : 30;
var baseStyles = {
  wrapper: {
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    '&::before': {
      content: "''",
      display: 'block',
      flex: 0,
      height: "".concat(scrollHintHeight, "px"),
      left: "".concat(scrollHintSpacing, "px"),
      position: 'absolute',
      right: "".concat(scrollHintSpacing + scrollBarSize, "px"),
      top: 0,
      zIndex: 1
    }
  },
  inner: {
    flexBasis: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    position: 'relative',
    '&::before': {
      content: "''",
      display: 'block',
      flexShrink: 0,
      height: "".concat(scrollHintHeight, "px"),
      left: "".concat(scrollHintSpacing, "px"),
      position: 'absolute',
      right: "".concat(scrollHintSpacing, "px"),
      top: 0,
      zIndex: 2
    }
  },
  // These styles are passed to the children function for the consumer to
  // apply
  children: {
    boxSizing: 'border-box',
    paddingLeft: "".concat(gridSize * 2, "px"),
    paddingRight: "".concat(gridSize * 2, "px")
  }
};

var _default = function _default(_ref) {
  var product = _ref.product;
  return function () {
    return {
      container: (0, _objectSpread2.default)({}, baseStyles, {
        wrapper: (0, _objectSpread2.default)({}, baseStyles.wrapper, {
          '&::before': (0, _objectSpread2.default)({}, baseStyles.wrapper['&::before'], {
            backgroundColor: _theme.colors.N30A
          })
        }),
        inner: (0, _objectSpread2.default)({}, baseStyles.inner, {
          '&::before': (0, _objectSpread2.default)({}, baseStyles.inner['&::before'], {
            backgroundColor: _theme.colors.N20
          })
        })
      }),
      product: (0, _objectSpread2.default)({}, baseStyles, {
        wrapper: (0, _objectSpread2.default)({}, baseStyles.wrapper, {
          '&::before': (0, _objectSpread2.default)({}, baseStyles.wrapper['&::before'], {
            backgroundColor: product.background.static
          })
        }),
        inner: (0, _objectSpread2.default)({}, baseStyles.inner, {
          '&::before': (0, _objectSpread2.default)({}, baseStyles.inner['&::before'], {
            backgroundColor: product.background.default
          })
        })
      })
    };
  };
};

exports.default = _default;
module.exports = exports.default;