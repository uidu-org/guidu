import Toasts from './components';
import reducer, { actions as toastActions } from './ducks';

const toastReducer = reducer;

export { Toasts, toastReducer, toastActions };
