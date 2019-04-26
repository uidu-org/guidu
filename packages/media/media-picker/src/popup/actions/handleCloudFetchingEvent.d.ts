import { Action } from 'redux';
import { WsUploadEvents } from '../tools/websocket/upload/wsUploadEvents';
import { MediaFile } from '../../domain/file';
export declare const HANDLE_CLOUD_FETCHING_EVENT = "HANDLE_CLOUD_FETCHING_EVENT";
export interface HandleCloudFetchingEventAction<T extends keyof WsUploadEvents> {
    readonly type: 'HANDLE_CLOUD_FETCHING_EVENT';
    readonly file: MediaFile;
    readonly event: T;
    readonly payload: WsUploadEvents[T];
}
export declare function isHandleCloudFetchingEventAction<T extends keyof WsUploadEvents>(action: Action): action is HandleCloudFetchingEventAction<T>;
export declare function handleCloudFetchingEvent<T extends keyof WsUploadEvents>(file: MediaFile, event: T, payload: WsUploadEvents[T]): HandleCloudFetchingEventAction<T>;
