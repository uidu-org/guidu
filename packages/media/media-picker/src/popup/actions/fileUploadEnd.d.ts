import { Action } from 'redux';
import { MediaFile as MediaStoreMediaFile } from '@uidu/media-store';
import { UploadEndEvent, UploadEndEventPayload } from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';
export declare const FILE_UPLOAD_END = "FILE_UPLOAD_END";
export interface FileUploadEndAction extends Action {
    readonly type: 'FILE_UPLOAD_END';
    readonly file: MediaFile;
    readonly publicFile: Partial<MediaStoreMediaFile>;
    readonly originalEvent: UploadEndEvent;
}
export declare function isFileUploadEndAction(action: Action): action is FileUploadEndAction;
export declare function fileUploadEnd(payload: UploadEndEventPayload): FileUploadEndAction;
