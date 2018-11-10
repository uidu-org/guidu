"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _theme = require("@atlaskit/theme");

var gridSize = (0, _theme.gridSize)();
var fontSize = 11;
var baseStyles = {
  headingBase: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    fontSize: "".concat(fontSize, "px"),
    fontWeight: 600,
    lineHeight: gridSize * 2 / fontSize,
    margin: "".concat(gridSize * 4, "px 0 ").concat(gridSize, "px"),
    padding: "0 ".concat(gridSize * 1.5, "px"),
    textTransform: 'uppercase'
  },
  textWrapper: {
    flexGrow: 1,
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%'
  },
  afterWrapper: {
    lineHeight: 1,
    marginLeft: "".concat(gridSize / 2, "px")
  }
};

var _default = function _default(_ref) {
  var product = _ref.product;
  return function () {
    return {
      container: (0, _objectSpread2.default)({}, baseStyles, {
        headingBase: (0, _objectSpread2.default)({}, baseStyles.headingBase, {
          color: _theme.colors.N200
        })
      }),
      product: (0, _objectSpread2.default)({}, baseStyles, {
        headingBase: (0, _objectSpread2.default)({}, baseStyles.headingBase, {
          color: product.text.subtle
        })
      })
    };
  };
};

exports.default = _default;
module.exports = exports.default;