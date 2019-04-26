import { Action } from 'redux';
import { UploadPreviewUpdateEvent, UploadPreviewUpdateEventPayload } from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';
export declare const FILE_PREVIEW_UPDATE = "FILE_PREVIEW_UPDATE";
export interface FileUploadPreviewUpdateAction extends Action {
    readonly type: 'FILE_PREVIEW_UPDATE';
    readonly file: MediaFile;
    readonly preview?: Blob;
    readonly originalEvent: UploadPreviewUpdateEvent;
}
export declare function isFileUploadPreviewUpdateAction(action: Action): action is FileUploadPreviewUpdateAction;
export declare function fileUploadPreviewUpdate(payload: UploadPreviewUpdateEventPayload): FileUploadPreviewUpdateAction;
