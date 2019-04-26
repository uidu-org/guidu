import { UploadEndEventPayload, UploadErrorEventPayload, UploadPreviewUpdateEventPayload, UploadProcessingEventPayload, UploadsStartEventPayload, UploadStatusUpdateEventPayload, UploadParams } from '..';
export declare type UploadServiceEventPayloadTypes = {
    readonly 'files-added': UploadsStartEventPayload;
    readonly 'file-preview-update': UploadPreviewUpdateEventPayload;
    readonly 'file-uploading': UploadStatusUpdateEventPayload;
    readonly 'file-converting': UploadProcessingEventPayload;
    readonly 'file-converted': UploadEndEventPayload;
    readonly 'file-upload-error': UploadErrorEventPayload;
    readonly 'file-dropped': DragEvent;
};
export declare type UploadServiceEventListener<E extends keyof UploadServiceEventPayloadTypes> = (payload: UploadServiceEventPayloadTypes[E]) => void;
export declare const MAX_FILE_SIZE_FOR_PREVIEW = 10000000;
export interface UploadService {
    setUploadParams(uploadParams: UploadParams): void;
    addFiles(files: File[]): void;
    addFilesWithSource(files: LocalFileWithSource[]): void;
    cancel(id?: string): void;
    on<E extends keyof UploadServiceEventPayloadTypes>(event: E, listener: UploadServiceEventListener<E>): void;
    off<E extends keyof UploadServiceEventPayloadTypes>(event: E, listener: UploadServiceEventListener<E>): void;
}
export declare enum LocalFileSource {
    PastedFile = 0,
    PastedScreenshot = 1,
    LocalUpload = 2
}
export interface LocalFileWithSource {
    file: File;
    source: LocalFileSource;
}
