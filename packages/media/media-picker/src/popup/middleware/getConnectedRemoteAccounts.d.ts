import { Action, Store, Dispatch } from 'redux';
import { Fetcher } from '../tools/fetcher/fetcher';
import { State } from '../domain';
export declare const getConnectedRemoteAccounts: (fetcher: Fetcher) => (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<Action<any>>) => (action: Action<any>) => Action<any>;
