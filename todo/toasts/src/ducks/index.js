import shortid from 'shortid';

// Actions
export const ADD_TOAST = 'ADD_TOAST';
export const REMOVE_TOAST = 'REMOVE_TOAST';

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case REMOVE_TOAST:
      return state.filter(a => a.key !== action.toastKey);
    case ADD_TOAST:
      return [
        ...state,
        {
          ...action.toast,
          key: shortid.generate(),
        },
      ];
    default:
      return state;
  }
}

// Action creators
export const addToast = toast => ({
  type: ADD_TOAST,
  toast,
});

export const removeToast = toastKey => ({
  type: REMOVE_TOAST,
  toastKey,
});

export const actions = {
  addToast,
  removeToast,
};
