"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CodeBlock;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _prismjs = _interopRequireDefault(require("prismjs"));

var _theme = require("@atlaskit/theme");

require("prismjs/components/prism-jsx");

var _docs = require("@atlaskit/docs");

var _codesandboxer = require("codesandboxer");

// import '!style-loader!css-loader!prismjs/themes/prism-tomorrow.css';
var Code = _styledComponents.default.pre.withConfig({
  displayName: "Code",
  componentId: "sc-7aisra-0"
})(["\n  border-radius: 3px;\n  background-color: ", ";\n  color: ", ";\n  display: block;\n  margin: 0 0 ", "px;\n  overflow-x: auto;\n  padding: ", "px;\n\n  & code {\n    font-family: Monaco, Menlo, monospace;\n    font-size: 0.9em;\n  }\n"], (0, _theme.themed)({
  light: _theme.colors.N800,
  dark: _theme.colors.N800
}), (0, _theme.themed)({
  light: _theme.colors.N60,
  dark: _theme.colors.N60
}), _theme.gridSize, _theme.gridSize);

function CodeBlock(props) {
  var syntax = _prismjs.default.languages[props.grammar];
  var srcFixed = (0, _docs.replaceSrc)(props.content, props.name);
  var importFixed = (0, _codesandboxer.replaceImports)(srcFixed, [['../glyph/*', "".concat(props.name, "/glyph/")]]);

  var highlighted = _prismjs.default.highlight(importFixed, syntax);

  return _react.default.createElement(Code, null, _react.default.createElement("code", {
    dangerouslySetInnerHTML: {
      __html: highlighted
    }
  }));
}

module.exports = exports.default;