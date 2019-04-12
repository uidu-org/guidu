import { ChunkinatorFile } from 'chunkinator';
import { MediaStore } from './media-store';
export declare type UploadableFile = {
    content: ChunkinatorFile;
    name?: string;
    mimeType?: string;
    collection?: string;
};
export declare type UploadableFileUpfrontIds = {
    id: string;
    deferredUploadId: Promise<string>;
    occurrenceKey?: string;
};
export declare type UploadFileCallbacks = {
    onProgress: (progress: number) => void;
    onUploadFinish: (error?: any) => void;
};
export interface UploadFileResult {
    cancel: () => void;
}
export declare const uploadFile: (file: UploadableFile, store: MediaStore, uploadableFileUpfrontIds: UploadableFileUpfrontIds, callbacks?: UploadFileCallbacks) => UploadFileResult;
