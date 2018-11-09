"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PackageDocument;

var _react = _interopRequireDefault(require("react"));

var _WrappedLoader = _interopRequireDefault(require("../components/WrappedLoader"));

var _reactHelmet = require("react-helmet");

var fs = _interopRequireWildcard(require("../utils/fs"));

var _Page = _interopRequireWildcard(require("../components/Page"));

var _FourOhFour = _interopRequireDefault(require("./FourOhFour"));

var _Loading = _interopRequireDefault(require("../components/Loading"));

var packages = [];

function PackageDocument(_ref) {
  var _ref$match$params = _ref.match.params,
      groupId = _ref$match$params.groupId,
      pkgId = _ref$match$params.pkgId,
      docId = _ref$match$params.docId;
  var filePath = "packages/".concat(groupId, "/").concat(pkgId, "/docs/").concat(docId);
  var found = fs.findNormalized(packages, filePath);

  if (!found) {
    return _react.default.createElement(_FourOhFour.default, null);
  }

  var Content = (0, _WrappedLoader.default)({
    loading: _Loading.default,
    loader: function loader() {
      return found && found.exports();
    },
    render: function render(doc) {
      return doc ? doc.default : _react.default.createElement(_FourOhFour.default, null);
    }
  });
  return _react.default.createElement(_Page.default, null, _react.default.createElement(_reactHelmet.Helmet, null, _react.default.createElement("title", null, fs.titleize(pkgId), " - ", fs.titleize(docId))), _react.default.createElement(_Page.Title, null, fs.titleize(pkgId), " - ", fs.titleize(docId)), _react.default.createElement(Content, null));
}

module.exports = exports.default;