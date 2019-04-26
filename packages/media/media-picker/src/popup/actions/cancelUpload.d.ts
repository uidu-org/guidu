import { Action } from 'redux';
export declare const CANCEL_UPLOAD = "CANCEL_UPLOAD";
export interface CancelUploadActionPayload {
    readonly tenantUploadId: string;
}
export interface CancelUploadAction extends Action {
    readonly type: 'CANCEL_UPLOAD';
    readonly payload: CancelUploadActionPayload;
}
export declare function isCancelUploadAction(action: Action): action is CancelUploadAction;
export declare function cancelUpload(payload: CancelUploadActionPayload): CancelUploadAction;
