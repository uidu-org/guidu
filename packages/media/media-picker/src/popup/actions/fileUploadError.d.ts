import { Action } from 'redux';
import { MediaError } from '../../domain/error';
import { UploadErrorEvent, UploadErrorEventPayload } from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';
export declare const FILE_UPLOAD_ERROR = "FILE_UPLOAD_ERROR";
export interface FileUploadErrorAction extends Action {
    readonly type: 'FILE_UPLOAD_ERROR';
    readonly file: MediaFile;
    readonly error: MediaError;
    readonly originalEvent: UploadErrorEvent;
}
export declare function isFileUploadErrorAction(action: Action): action is FileUploadErrorAction;
export declare function fileUploadError(payload: UploadErrorEventPayload): FileUploadErrorAction;
