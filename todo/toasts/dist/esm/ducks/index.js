import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import shortid from 'shortid'; // Actions

export var ADD_TOAST = 'ADD_TOAST';
export var REMOVE_TOAST = 'REMOVE_TOAST'; // Reducer

export default function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case REMOVE_TOAST:
      return state.filter(function (a) {
        return a.key !== action.toastKey;
      });

    case ADD_TOAST:
      return _toConsumableArray(state).concat([_objectSpread({}, action.toast, {
        key: shortid.generate()
      })]);

    default:
      return state;
  }
} // Action creators

export var addToast = function addToast(toast) {
  return {
    type: ADD_TOAST,
    toast: toast
  };
};
export var removeToast = function removeToast(toastKey) {
  return {
    type: REMOVE_TOAST,
    toastKey: toastKey
  };
};
export var actions = {
  addToast: addToast,
  removeToast: removeToast
};