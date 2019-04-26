import { Store, Action, Dispatch } from 'redux';
import { State } from '../domain';
import { PopupUploadEventEmitter } from '../../components/types';
declare const _default: (eventEmitter: PopupUploadEventEmitter) => (_: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: Action<any>) => any;
export default _default;
