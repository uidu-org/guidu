import { Store, Dispatch } from 'redux';
import { RequestUnlinkCloudAccountAction } from '../actions';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
declare const _default: (fetcher: Fetcher) => (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: RequestUnlinkCloudAccountAction) => any;
export default _default;
