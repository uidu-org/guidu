"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("@atlaskit/theme");

var Required = _styledComponents.default.span.withConfig({
  displayName: "Required",
  componentId: "epjbtj-0"
})(["\n  color: ", ";\n"], (0, _theme.themed)({
  light: _theme.colors.R500,
  dark: _theme.colors.R300
}));

var _default = Required;
exports.default = _default;
module.exports = exports.default;