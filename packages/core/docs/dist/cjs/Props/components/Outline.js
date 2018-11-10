"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("@atlaskit/theme");

var Outline = _styledComponents.default.span.withConfig({
  displayName: "Outline",
  componentId: "cg2xkq-0"
})(["\n  color: ", ";\n  line-height: 1;\n"], _theme.colors.subtleText);

var _default = Outline;
exports.default = _default;
module.exports = exports.default;