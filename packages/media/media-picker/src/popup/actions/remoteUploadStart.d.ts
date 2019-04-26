import { Action } from 'redux';
export declare const REMOTE_UPLOAD_START = "REMOTE_UPLOAD_START";
export interface RemoteUploadStartAction extends Action {
    readonly type: 'REMOTE_UPLOAD_START';
    readonly uploadId: string;
}
export declare function remoteUploadStart(uploadId: string): RemoteUploadStartAction;
