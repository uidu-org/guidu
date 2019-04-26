import { Store, Dispatch, Action } from 'redux';
import { State } from '../domain';
export declare const changeService: (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: Action<any>) => Promise<any>;
