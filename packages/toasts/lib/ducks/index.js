"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;
exports.actions = exports.removeToast = exports.addToast = exports.REMOVE_TOAST = exports.ADD_TOAST = void 0;

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
      return _toConsumableArray(state).concat([_objectSpread({}, action.toast, {
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