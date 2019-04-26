import { Store, Dispatch, Action } from 'redux';
import { UploadEvent } from '../../domain/uploadEvent';
import { State } from '../domain';
import { MediaFile } from '../../domain/file';
export interface ProxyUploadEventsAction extends Action {
    readonly file: MediaFile;
    readonly originalEvent: UploadEvent;
}
export declare const proxyUploadEvents: (store: Store<State, import("redux").AnyAction>) => (next: Dispatch<State>) => (action: ProxyUploadEventsAction) => any;
