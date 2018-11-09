"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Intro = exports.Section = exports.Title = exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _theme = require("@atlaskit/theme");

var containerWidth = {
  small: '480px',
  medium: '640px',
  large: '980px'
};

var PageContainer = _styledComponents.default.main.withConfig({
  displayName: "Page__PageContainer",
  componentId: "qzrb1e-0"
})(["\n  max-width: ", ";\n  margin: 2rem auto;\n  padding: 0 2rem;\n"], function (p) {
  return containerWidth[p.width] ? containerWidth[p.width] : containerWidth.medium;
});

var _default = PageContainer;
exports.default = _default;

var Title = _styledComponents.default.h1.withConfig({
  displayName: "Page__Title",
  componentId: "qzrb1e-1"
})(["\n  margin-bottom: 1em;\n"]);

exports.Title = Title;

var Section = _styledComponents.default.section.withConfig({
  displayName: "Page__Section",
  componentId: "qzrb1e-2"
})(["\n  margin-top: 3em;\n\n  p {\n    line-height: 1.4em;\n  }\n"]);

exports.Section = Section;

var Intro = _styledComponents.default.p.withConfig({
  displayName: "Page__Intro",
  componentId: "qzrb1e-3"
})(["\n  font-size: ", "px;\n  font-weight: 300;\n  line-height: 1.4em;\n"], _theme.math.multiply(_theme.gridSize, 2));

exports.Intro = Intro;