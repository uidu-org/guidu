import { Context } from '@uidu/media-core';
import { Store } from 'redux';
import { State } from '../popup/domain';
import { PopupConfig, PopupUploadEventEmitter } from '../components/types';
declare const _default: (eventEmitter: PopupUploadEventEmitter, tenantContext: Context, userContext: Context, config: Partial<PopupConfig>) => Store<State, import("redux").AnyAction>;
export default _default;
