"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _cssReset = _interopRequireDefault(require("@atlaskit/css-reset"));

require("regenerator-runtime/runtime");

var _insertStyleSheetInHead = _interopRequireDefault(require("./utils/insertStyleSheetInHead"));

var _loader = _interopRequireDefault(require("./pages/Examples/loader"));

(0, _insertStyleSheetInHead.default)(_cssReset.default);
var componentNode = document.getElementById('examples');

if (typeof window !== 'undefined') {
  window.unmountApp = function unmountApp() {
    return (0, _reactDom.unmountComponentAtNode)(componentNode);
  };
}

(0, _reactDom.render)(_react.default.createElement(_loader.default, null), componentNode);