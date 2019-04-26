import { Context } from '@uidu/media-core';
import { LocalUploadComponent } from '../localUpload';
import { DropzoneUploadEventPayloadMap, DropzoneConfig, Dropzone } from '../types';
export declare class DropzoneImpl extends LocalUploadComponent<DropzoneUploadEventPayloadMap> implements Dropzone {
    private container;
    private instance?;
    private headless;
    private uiActive;
    private proxyReactContext?;
    constructor(context: Context, config?: DropzoneConfig);
    activate(): Promise<void>;
    private readonly onFileDropped;
    deactivate(): void;
    private addDropzone;
    private removeDropzone;
    private onDragOver;
    private getDraggedItemsLength;
    private onDragLeave;
    private createInstance;
    private getDropzoneUI;
    private onDrop;
    private emitDragOver;
    private emitDragLeave;
    private static dragContainsFiles;
}
