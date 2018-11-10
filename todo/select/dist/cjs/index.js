"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxGroup = exports.Checkbox = void 0;

var _fieldBase = require("@uidu/field-base");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _CheckboxGroup = _interopRequireDefault(require("./CheckboxGroup"));

var Checkbox = (0, _fieldBase.ComponentHOC)(_Checkbox.default);
exports.Checkbox = Checkbox;
var CheckboxGroup = (0, _fieldBase.ComponentHOC)(_CheckboxGroup.default);
exports.CheckboxGroup = CheckboxGroup;