"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Pattern;

var _react = _interopRequireDefault(require("react"));

var _WrappedLoader = _interopRequireDefault(require("../components/WrappedLoader"));

var fs = _interopRequireWildcard(require("../utils/fs"));

var _Page = _interopRequireDefault(require("../components/Page"));

var _FourOhFour = _interopRequireDefault(require("./FourOhFour"));

var _Loading = _interopRequireDefault(require("../components/Loading"));

var patterns = [];

function Pattern(_ref) {
  var patternId = _ref.match.params.patternId;
  var filePath = "patterns/".concat(patternId);
  var found = fs.findNormalized(patterns, filePath);

  if (!found) {
    return _react.default.createElement(_FourOhFour.default, null);
  }

  var Content = (0, _WrappedLoader.default)({
    loader: function loader() {
      return found && found.exports();
    },
    loading: _Loading.default,
    render: function render(mod) {
      if (mod && mod.default) {
        return _react.default.createElement(mod.default);
      }

      return _react.default.createElement(_FourOhFour.default, null);
    }
  });
  return _react.default.createElement(_Page.default, null, _react.default.createElement(Content, null));
}

module.exports = exports.default;