import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
export declare const handleCloudFetchingEvent: (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: Action<any>) => any;
