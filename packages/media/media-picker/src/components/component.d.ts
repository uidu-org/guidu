import { MediaFile as MediaStoreMediaFile } from '@uidu/media-store';
import { MediaFile } from '../domain/file';
import { MediaProgress } from '../domain/progress';
import { MediaError } from '../domain/error';
import { Preview } from '../domain/preview';
import { GenericEventEmitter } from '../util/eventEmitter';
import { UploadEventPayloadMap } from '../domain/uploadEvent';
export interface UploadEventEmitter {
    emitUploadsStart(files: MediaFile[]): void;
    emitUploadProgress(file: MediaFile, progress: MediaProgress): void;
    emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void;
    emitUploadProcessing(file: MediaFile): void;
    emitUploadEnd(file: MediaFile, fileDetails: Partial<MediaStoreMediaFile>): void;
    emitUploadError(file: MediaFile, error: MediaError): void;
}
export declare class UploadComponent<M extends UploadEventPayloadMap> extends GenericEventEmitter<M> implements UploadEventEmitter {
    emitUploadsStart(files: MediaFile[]): void;
    emitUploadProgress(file: MediaFile, progress: MediaProgress): void;
    emitUploadPreviewUpdate(file: MediaFile, preview: Preview): void;
    emitUploadProcessing(file: MediaFile): void;
    emitUploadEnd(file: MediaFile, fileDetails: Partial<MediaStoreMediaFile>): void;
    emitUploadError(file: MediaFile, error: MediaError): void;
}
