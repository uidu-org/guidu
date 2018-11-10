"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _theme = require("@atlaskit/theme");

var gridSize = (0, _theme.gridSize)(); // These are the styles which are consistent regardless of theme

var baseStyles = {
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: "".concat(gridSize * 5),
    paddingLeft: "".concat(gridSize * 1.5, "px"),
    paddingRight: "".concat(gridSize * 1.5, "px"),
    opacity: 0.5
  },
  before: {
    backgroundColor: 'red',
    borderRadius: '50%',
    flexShrink: 0,
    height: "".concat(gridSize * 3, "px"),
    marginRight: "".concat(gridSize * 2, "px"),
    width: "".concat(gridSize * 3, "px")
  },
  content: {
    borderRadius: "".concat(gridSize / 2, "px"),
    flexGrow: 1,
    height: "".concat(gridSize * 2.5, "px")
  }
}; // Light theme

var _default = function _default(_ref) {
  var product = _ref.product;
  return function () {
    return {
      container: {
        wrapper: baseStyles.wrapper,
        before: (0, _objectSpread2.default)({}, baseStyles.before, {
          backgroundColor: _theme.colors.N40
        }),
        content: (0, _objectSpread2.default)({}, baseStyles.content, {
          backgroundColor: _theme.colors.N40
        })
      },
      product: {
        wrapper: baseStyles.wrapper,
        before: (0, _objectSpread2.default)({}, baseStyles.before, {
          backgroundColor: product.background.static
        }),
        content: (0, _objectSpread2.default)({}, baseStyles.content, {
          backgroundColor: product.background.static
        })
      }
    };
  };
};

exports.default = _default;
module.exports = exports.default;