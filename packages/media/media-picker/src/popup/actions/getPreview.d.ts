import { Action } from 'redux';
import { MediaFile } from '../../domain/file';
export declare const GET_PREVIEW = "GET_PREVIEW";
export declare type GetPreviewAction = {
    readonly type: typeof GET_PREVIEW;
    readonly uploadId: string;
    readonly file: MediaFile;
    readonly collection: string;
};
export declare function isGetPreviewAction(action: Action): action is GetPreviewAction;
export declare function getPreview(uploadId: string, file: MediaFile, collection: string): GetPreviewAction;
