import { UploadEvent } from '../../domain/uploadEvent';
import { Action } from 'redux';
export declare const SEND_UPLOAD_EVENT = "SEND_UPLOAD_EVENT";
export declare type SendUploadEventActionPayload = {
    readonly event: UploadEvent;
    readonly uploadId: string;
};
export declare type SendUploadEventAction = {
    readonly type: typeof SEND_UPLOAD_EVENT;
    readonly payload: SendUploadEventActionPayload;
};
export declare function isSendUploadEventAction(action: Action): action is SendUploadEventAction;
export declare function sendUploadEvent(payload: SendUploadEventActionPayload): SendUploadEventAction;
