import { Store, Dispatch, Action } from 'redux';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
export interface TrendingGifsParams {
    readonly offset?: number;
    readonly query: string;
    readonly shouldAppendResults: boolean;
}
declare const _default: (fetcher: Fetcher) => (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: Action<any>) => any;
export default _default;
export declare const fetchGifs: (fetcher: Fetcher, store: Store<State, import("redux").AnyAction>, params: TrendingGifsParams) => Promise<void>;
