import { Action } from 'redux';
import { UploadProcessingEvent, UploadProcessingEventPayload } from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';
export declare const FILE_UPLOAD_PROCESSING_START = "FILE_UPLOAD_PROCESSING_START";
export interface FileUploadProcessingStartAction extends Action {
    readonly type: 'FILE_UPLOAD_PROCESSING_START';
    readonly file: MediaFile;
    readonly originalEvent: UploadProcessingEvent;
}
export declare function isFileUploadProcessingStartAction(action: Action): action is FileUploadProcessingStartAction;
export declare function fileUploadProcessingStart(payload: UploadProcessingEventPayload): FileUploadProcessingStartAction;
