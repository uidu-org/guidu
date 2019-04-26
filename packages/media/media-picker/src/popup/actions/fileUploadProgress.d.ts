import { Action } from 'redux';
import { UploadStatusUpdateEvent, UploadStatusUpdateEventPayload } from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';
export declare const FILE_UPLOAD_PROGRESS = "FILE_UPLOAD_PROGRESS";
export interface FileUploadProgressAction extends Action {
    readonly type: 'FILE_UPLOAD_PROGRESS';
    readonly file: MediaFile;
    readonly progress: number;
    readonly originalEvent: UploadStatusUpdateEvent;
}
export declare function isFileUploadProgressAction(action: Action): action is FileUploadProgressAction;
export declare function fileUploadProgress(payload: UploadStatusUpdateEventPayload): FileUploadProgressAction;
