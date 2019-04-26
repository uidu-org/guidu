import { Store, Dispatch } from 'redux';
import { EditRemoteImageAction } from '../actions/editRemoteImage';
import { State } from '../domain';
export declare const editRemoteImageMiddleware: () => (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: EditRemoteImageAction) => any;
export declare function editRemoteImage(store: Store<State>, action: EditRemoteImageAction): Promise<void>;
