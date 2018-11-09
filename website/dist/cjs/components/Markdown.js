"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Markdown;

var _react = _interopRequireDefault(require("react"));

var _reactHelmet = require("react-helmet");

var _commonmark = _interopRequireDefault(require("commonmark"));

var _commonmarkReactRenderer = _interopRequireDefault(require("commonmark-react-renderer"));

var _code = require("@atlaskit/code");

var _Heading = _interopRequireDefault(require("./Markdown/Heading"));

var parser = new _commonmark.default.Parser();
var renderer = new _commonmarkReactRenderer.default({
  renderers: {
    CodeBlock: function CodeBlock(props) {
      return _react.default.createElement("p", null, _react.default.createElement(_code.AkCodeBlock, {
        text: props.literal,
        language: props.language
      }));
    },
    Code: function Code(props) {
      return _react.default.createElement(_code.AkCode, {
        text: props.literal,
        language: props.language
      });
    },
    Heading: _Heading.default
  }
});

function Markdown(_ref) {
  var children = _ref.children,
      description = _ref.description;
  return _react.default.createElement("div", null, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("meta", {
    name: "description",
    content: description
  })), renderer.render(parser.parse(children)));
}

module.exports = exports.default;