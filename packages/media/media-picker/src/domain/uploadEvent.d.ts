import { MediaFile as MediaStoreMediaFile } from '@uidu/media-store';
import { MediaProgress } from './progress';
import { MediaError } from './error';
import { Preview, isImagePreview } from './preview';
import { MediaFile } from './file';
export { isImagePreview };
export declare type UploadsStartEventPayload = {
    readonly files: MediaFile[];
};
export declare type UploadPreviewUpdateEventPayload = {
    readonly file: MediaFile;
    readonly preview: Preview;
};
export declare type UploadStatusUpdateEventPayload = {
    readonly file: MediaFile;
    readonly progress: MediaProgress;
};
export declare type UploadProcessingEventPayload = {
    readonly file: MediaFile;
};
export declare type UploadEndEventPayload = {
    readonly file: MediaFile;
    readonly public: Partial<MediaStoreMediaFile>;
};
export declare type UploadErrorEventPayload = {
    readonly file: MediaFile;
    readonly error: MediaError;
};
export declare type UploadEventPayloadMap = {
    readonly 'uploads-start': UploadsStartEventPayload;
    readonly 'upload-preview-update': UploadPreviewUpdateEventPayload;
    readonly 'upload-status-update': UploadStatusUpdateEventPayload;
    readonly 'upload-processing': UploadProcessingEventPayload;
    readonly 'upload-end': UploadEndEventPayload;
    readonly 'upload-error': UploadErrorEventPayload;
};
export declare type UploadEventMap = {
    readonly [K in keyof UploadEventPayloadMap]: {
        readonly name: K;
        readonly data: UploadEventPayloadMap[K];
    };
};
export declare type UploadEventName = keyof UploadEventMap;
export declare type UploadEvent = UploadEventMap[UploadEventName];
export declare type UploadsStartEvent = UploadEventMap['uploads-start'];
export declare type UploadPreviewUpdateEvent = UploadEventMap['upload-preview-update'];
export declare type UploadStatusUpdateEvent = UploadEventMap['upload-status-update'];
export declare type UploadProcessingEvent = UploadEventMap['upload-processing'];
export declare type UploadEndEvent = UploadEventMap['upload-end'];
export declare type UploadErrorEvent = UploadEventMap['upload-error'];
