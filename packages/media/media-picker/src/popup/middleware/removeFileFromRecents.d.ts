import { Store, Dispatch, Action } from 'redux';
import { State } from '../domain';
export declare const removeFileFromRecents: (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: Action<any>) => any;
