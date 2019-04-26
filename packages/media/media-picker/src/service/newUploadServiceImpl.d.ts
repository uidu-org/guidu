import { Context } from '@uidu/media-core';
import { MediaFile } from '../domain/file';
import { UploadParams } from '..';
import { UploadService, UploadServiceEventListener, UploadServiceEventPayloadTypes } from './types';
import { LocalFileSource, LocalFileWithSource } from '../service/types';
export interface CancellableFileUpload {
    mediaFile: MediaFile;
    file: File;
    source: LocalFileSource;
    cancel?: () => void;
}
export declare class NewUploadServiceImpl implements UploadService {
    private readonly tenantContext;
    private tenantUploadParams;
    private readonly shouldCopyFileToRecents;
    private readonly userMediaStore?;
    private readonly tenantMediaStore;
    private readonly userContext?;
    private readonly emitter;
    private cancellableFilesUploads;
    constructor(tenantContext: Context, tenantUploadParams: UploadParams, shouldCopyFileToRecents: boolean);
    setUploadParams(uploadParams: UploadParams): void;
    private createUploadController;
    addFiles(files: File[]): void;
    addFilesWithSource(files: LocalFileWithSource[]): void;
    cancel(id?: string): void;
    on<E extends keyof UploadServiceEventPayloadTypes>(event: E, listener: UploadServiceEventListener<E>): void;
    off<E extends keyof UploadServiceEventPayloadTypes>(event: E, listener: UploadServiceEventListener<E>): void;
    private readonly emit;
    private emitPreviews;
    private getMediaTypeFromFile;
    private releaseCancellableFile;
    private readonly onFileSuccess;
    private readonly onFileProgress;
    private readonly onFileError;
    private copyFileToUsersCollection;
}
