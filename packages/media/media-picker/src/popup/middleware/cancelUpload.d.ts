import { MiddlewareAPI, Dispatch, Action } from 'redux';
import { State } from '../domain';
declare const _default: (store: MiddlewareAPI<State, any>) => (next: Dispatch<State>) => (action: Action<any>) => any;
export default _default;
