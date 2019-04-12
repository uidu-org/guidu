import { MediaFile, MediaStoreResponse, MediaType, MediaFileArtifacts, MediaCollectionItemFullDetails } from '@uidu/media-store';
export declare type FileStatus = 'uploading' | 'processing' | 'processed' | 'error' | 'failed-processing';
export interface FilePreview {
    value: Blob | string;
    originalDimensions?: {
        width: number;
        height: number;
    };
}
export interface PreviewOptions {
}
export interface GetFileOptions {
    preview?: PreviewOptions;
    collectionName?: string;
    occurrenceKey?: string;
}
export interface UploadingFileState {
    status: 'uploading';
    id: string;
    occurrenceKey?: string;
    name: string;
    size: number;
    progress: number;
    mediaType: MediaType;
    mimeType: string;
    preview?: FilePreview | Promise<FilePreview>;
}
export interface ProcessingFileState {
    status: 'processing';
    id: string;
    occurrenceKey?: string;
    name: string;
    size: number;
    mediaType: MediaType;
    mimeType: string;
    preview?: FilePreview | Promise<FilePreview>;
}
export interface ProcessedFileState {
    status: 'processed';
    id: string;
    occurrenceKey?: string;
    name: string;
    size: number;
    artifacts: MediaFileArtifacts;
    mediaType: MediaType;
    mimeType: string;
    preview?: FilePreview | Promise<FilePreview>;
}
export interface ProcessingFailedState {
    status: 'failed-processing';
    id: string;
    occurrenceKey?: string;
    name: string;
    size: number;
    artifacts: Object;
    mediaType: MediaType;
    mimeType: string;
    preview?: FilePreview | Promise<FilePreview>;
}
export interface ErrorFileState {
    status: 'error';
    id: string;
    occurrenceKey?: string;
    message?: string;
}
export declare type FileState = UploadingFileState | ProcessingFileState | ProcessedFileState | ErrorFileState | ProcessingFailedState;
export declare const isErrorFileState: (fileState: FileState) => fileState is ErrorFileState;
export declare const mapMediaFileToFileState: (mediaFile: MediaStoreResponse<MediaFile>) => FileState;
export declare const mapMediaItemToFileState: (id: string, item: MediaCollectionItemFullDetails) => FileState;
