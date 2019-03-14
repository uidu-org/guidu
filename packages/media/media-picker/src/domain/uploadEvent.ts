import { MediaFile as MediaStoreMediaFile } from '@uidu/media-store';
import { MediaProgress } from './progress';
import { MediaError } from './error';
import { Preview, isImagePreview } from './preview';
import { MediaFile } from './file';

export { isImagePreview };

export type UploadsStartEventPayload = {
  readonly files: MediaFile[];
};

export type UploadPreviewUpdateEventPayload = {
  readonly file: MediaFile;
  readonly preview: Preview;
};

export type UploadStatusUpdateEventPayload = {
  readonly file: MediaFile;
  readonly progress: MediaProgress;
};

export type UploadProcessingEventPayload = {
  readonly file: MediaFile;
};

export type UploadEndEventPayload = {
  readonly file: MediaFile;
  readonly public: Partial<MediaStoreMediaFile>; // TODO [MS-1446]: remove
};

export type UploadErrorEventPayload = {
  readonly file: MediaFile;
  readonly error: MediaError;
};

export type UploadEventPayloadMap = {
  readonly 'uploads-start': UploadsStartEventPayload;
  readonly 'upload-preview-update': UploadPreviewUpdateEventPayload;
  readonly 'upload-status-update': UploadStatusUpdateEventPayload;
  readonly 'upload-processing': UploadProcessingEventPayload;
  readonly 'upload-end': UploadEndEventPayload;
  readonly 'upload-error': UploadErrorEventPayload;
};

export type UploadEventMap = {
  readonly [K in keyof UploadEventPayloadMap]: {
    readonly name: K;
    readonly data: UploadEventPayloadMap[K];
  }
};

export type UploadEventName = keyof UploadEventMap;
export type UploadEvent = UploadEventMap[UploadEventName];

export type UploadsStartEvent = UploadEventMap['uploads-start'];
export type UploadPreviewUpdateEvent = UploadEventMap['upload-preview-update'];
export type UploadStatusUpdateEvent = UploadEventMap['upload-status-update'];
export type UploadProcessingEvent = UploadEventMap['upload-processing'];
export type UploadEndEvent = UploadEventMap['upload-end'];
export type UploadErrorEvent = UploadEventMap['upload-error'];
