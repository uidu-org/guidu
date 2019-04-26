import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
export declare const getFilesInRecents: () => (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<Action<any>>) => (action: Action<any>) => Action<any>;
export declare const requestRecentFiles: (store: Store<State, import("redux").AnyAction>) => void;
