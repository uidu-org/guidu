import { Action, Store, Dispatch } from 'redux';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
export declare const fetchNextCloudFilesPageMiddleware: (fetcher: Fetcher) => (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: Action<any>) => any;
