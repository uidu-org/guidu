"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _docs = require("@atlaskit/docs");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  import {\n    Checkbox,\n    CheckboxIcon\n  } from '@atlaskit/checkbox';\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ### Usage\n\n  A checkbox element primarily for use in forms.\n\n  ", "\n\n  The Checkbox export provides for controlled & uncontrolled usage and includes the label, input & icon.\n\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _docs.md)(_templateObject(), (0, _docs.code)(_templateObject2()));

exports.default = _default;
module.exports = exports.default;