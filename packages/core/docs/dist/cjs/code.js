"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = code;

var _react = _interopRequireDefault(require("react"));

var _stringRaw = _interopRequireDefault(require("string-raw"));

var _reactSyntaxHighlighter = require("react-syntax-highlighter");

var _prism = require("react-syntax-highlighter/dist/styles/prism");

/*
 * Tag function to render a code block, e.g. code`console.log("hello world")`
 * Template expressions aren't yet supported, and likely never will be.
 */
function code( // Tagged Template Literal support is still WIP for flow: https://github.com/facebook/flow/issues/2616
sources) {
  for (var _len = arguments.length, substitutions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substitutions[_key - 1] = arguments[_key];
  }

  var source = (0, _stringRaw.default)(sources, substitutions);
  source = source.replace(/^(\s*\n)+/g, ''); // Remove leading newlines

  source = source.replace(/(\n\s*)+$/g, ''); // Remove trailing newlines

  return _react.default.createElement("div", {
    className: "my-3"
  }, _react.default.createElement(_reactSyntaxHighlighter.Prism, {
    language: "javascript",
    style: _prism.tomorrow
  }, source));
}

module.exports = exports.default;