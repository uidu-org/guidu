"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Document;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _WrappedLoader = _interopRequireDefault(require("../components/WrappedLoader"));

var fs = _interopRequireWildcard(require("../utils/fs"));

var _Page = _interopRequireDefault(require("../components/Page"));

var _Markdown = _interopRequireDefault(require("../components/Markdown"));

var _FourOhFour = _interopRequireDefault(require("./FourOhFour"));

var _Loading = _interopRequireDefault(require("../components/Loading"));

var docs = [];

function Document(_ref) {
  var docId = _ref.match.params.docId;

  if (!docId) {
    var _found = fs.getFiles(docs.children)[0];
    if (!_found) return _react.default.createElement(_FourOhFour.default, null);
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/docs/".concat(fs.normalize(_found.id))
    });
  }

  var filePath = "docs/".concat(docId);
  var found = fs.findNormalized(docs, filePath);
  var Content = (0, _WrappedLoader.default)({
    loader: function loader() {
      return found && found.exports();
    },
    loading: _Loading.default,
    render: function render() {
      var md = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var docDetails = md.default || {};
      var content = docDetails.content,
          _docDetails$data = docDetails.data,
          data = _docDetails$data === void 0 ? {} : _docDetails$data;

      if (content) {
        return _react.default.createElement(_Markdown.default, data, content);
      }

      return _react.default.createElement(_FourOhFour.default, null);
    }
  });
  return _react.default.createElement(_Page.default, null, _react.default.createElement(Content, null));
}

module.exports = exports.default;