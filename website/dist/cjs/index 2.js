"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _cssReset = _interopRequireDefault(require("@atlaskit/css-reset"));

require("regenerator-runtime/runtime");

var _insertStyleSheetInHead = _interopRequireDefault(require("./utils/insertStyleSheetInHead"));

var _App = _interopRequireDefault(require("./containers/App"));

(0, _insertStyleSheetInHead.default)(_cssReset.default);
(0, _reactDom.render)(_react.default.createElement(_App.default, null), document.getElementById('app'));