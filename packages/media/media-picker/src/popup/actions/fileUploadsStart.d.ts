import { Action } from 'redux';
import { UploadsStartEventPayload } from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';
export declare const FILE_UPLOADS_START = "FILE_UPLOADS_START";
export interface FileUploadsStartAction extends Action {
    readonly type: 'FILE_UPLOADS_START';
    readonly files: MediaFile[];
}
export declare function isFileUploadsStartAction(action: Action): action is FileUploadsStartAction;
export declare function fileUploadsStart(payload: UploadsStartEventPayload): FileUploadsStartAction;
