import { Dispatch, MiddlewareAPI, Action } from 'redux';
import { State } from '../domain';
export default function (): (store: MiddlewareAPI<State, any>) => (next: Dispatch<State>) => (action: Action<any>) => any;
