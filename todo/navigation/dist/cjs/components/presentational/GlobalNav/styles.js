"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _theme = require("@atlaskit/theme");

var _constants = require("../../../common/constants");

var gridSize = (0, _theme.gridSize)();
var baseStyles = {
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  height: '100vh',
  justifyContent: 'space-between',
  paddingBottom: gridSize * 3,
  paddingTop: gridSize * 3,
  transition: 'background-color 0.3s cubic-bezier(0.2, 0, 0, 1), color 0.3s cubic-bezier(0.2, 0, 0, 1)',
  width: _constants.GLOBAL_NAV_WIDTH
};

var _default = function _default(_ref) {
  var product = _ref.product;
  return function () {
    return (0, _objectSpread2.default)({}, baseStyles, {
      backgroundColor: product.background.default,
      color: product.text.default,
      fill: product.background.default
    });
  };
};

exports.default = _default;
module.exports = exports.default;