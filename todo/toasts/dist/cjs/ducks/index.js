"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.actions = exports.removeToast = exports.addToast = exports.REMOVE_TOAST = exports.ADD_TOAST = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _shortid = _interopRequireDefault(require("shortid"));

// Actions
var ADD_TOAST = 'ADD_TOAST';
exports.ADD_TOAST = ADD_TOAST;
var REMOVE_TOAST = 'REMOVE_TOAST'; // Reducer

exports.REMOVE_TOAST = REMOVE_TOAST;

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case REMOVE_TOAST:
      return state.filter(function (a) {
        return a.key !== action.toastKey;
      });

    case ADD_TOAST:
      return (0, _toConsumableArray2.default)(state).concat([(0, _objectSpread2.default)({}, action.toast, {
        key: _shortid.default.generate()
      })]);

    default:
      return state;
  }
} // Action creators


var addToast = function addToast(toast) {
  return {
    type: ADD_TOAST,
    toast: toast
  };
};

exports.addToast = addToast;

var removeToast = function removeToast(toastKey) {
  return {
    type: REMOVE_TOAST,
    toastKey: toastKey
  };
};

exports.removeToast = removeToast;
var actions = {
  addToast: addToast,
  removeToast: removeToast
};
exports.actions = actions;