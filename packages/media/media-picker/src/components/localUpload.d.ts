import { Context } from '@uidu/media-core';
import { UploadService } from '../service/types';
import { UploadEventPayloadMap } from '../domain/uploadEvent';
import { UploadComponent } from './component';
import { UploadParams } from '../domain/config';
import { LocalUploadConfig } from './types';
export declare class LocalUploadComponent<M extends UploadEventPayloadMap = UploadEventPayloadMap> extends UploadComponent<M> implements LocalUploadComponent {
    protected readonly uploadService: UploadService;
    protected readonly context: Context;
    protected config: LocalUploadConfig;
    constructor(context: Context, config: LocalUploadConfig);
    cancel(uniqueIdentifier?: string): void;
    setUploadParams(uploadParams: UploadParams): void;
    private onFilesAdded;
    private onFilePreviewUpdate;
    private onFileUploading;
    private onFileConverting;
    private onFileConverted;
    private onUploadError;
}
