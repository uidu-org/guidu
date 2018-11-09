"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

it('renders without crashing', function () {
  var div = document.createElement('div');

  _reactDom.default.render(_react.default.createElement(_App.default, null), div);

  _reactDom.default.unmountComponentAtNode(div);
});