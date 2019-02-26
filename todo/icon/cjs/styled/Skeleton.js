"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _constants = require("../constants");

var _default = _styledComponents.default.div.withConfig({
  displayName: "Skeleton",
  componentId: "sc-2h9vi0-0"
})(["\n  width: ", ";\n  height: ", ";\n  display: inline-block;\n  border-radius: 50%;\n  background-color: ", ";\n  opacity: ", ";\n"], function (props) {
  return _constants.sizes[props.size];
}, function (props) {
  return _constants.sizes[props.size];
}, function (_ref) {
  var color = _ref.color;
  return color || 'currentColor';
}, function (_ref2) {
  var weight = _ref2.weight;
  return weight === 'strong' ? 0.3 : 0.15;
});

exports.default = _default;