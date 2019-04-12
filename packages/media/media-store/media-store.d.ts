import { MediaFile, MediaCollection, MediaCollectionItems, MediaUpload, MediaChunksProbe, MediaCollectionItemFullDetails } from './models/media';
import { AsapBasedAuth, AuthContext, ClientAltBasedAuth, MediaApiConfig } from './models/auth';
import { RequestMethod, RequestParams, RequestHeaders } from './utils/request';
import { MediaFileArtifacts } from './models/artifacts';
export declare class MediaStore {
    private readonly config;
    constructor(config: MediaApiConfig);
    createCollection(collectionName: string): Promise<MediaStoreResponse<MediaCollection>>;
    getCollection(collectionName: string): Promise<MediaStoreResponse<MediaCollection>>;
    getCollectionItems(collectionName: string, params?: MediaStoreGetCollectionItemsParams): Promise<MediaStoreResponse<MediaCollectionItems>>;
    removeCollectionFile(id: string, collectionName: string, occurrenceKey?: string): Promise<void>;
    createUpload(createUpTo?: number, collectionName?: string): Promise<MediaStoreResponse<MediaUpload[]>>;
    uploadChunk(etag: string, blob: Blob, collectionName?: string): Promise<void>;
    probeChunks(chunks: string[], collectionName?: string): Promise<MediaStoreResponse<MediaChunksProbe>>;
    createFileFromUpload(body: MediaStoreCreateFileFromUploadBody, params?: MediaStoreCreateFileFromUploadParams): Promise<MediaStoreResponse<MediaFile>>;
    touchFiles(body: MediaStoreTouchFileBody, params?: MediaStoreTouchFileParams): Promise<MediaStoreResponse<TouchedFiles>>;
    createFile(params?: MediaStoreCreateFileParams): Promise<MediaStoreResponse<EmptyFile>>;
    createFileFromBinary(blob: Blob, params?: MediaStoreCreateFileFromBinaryParams): Promise<MediaStoreResponse<MediaFile>>;
    getFile: (fileId: string, params?: MediaStoreGetFileParams) => Promise<MediaStoreResponse<MediaFile>>;
    getFileImageURL: (id: string, params?: MediaStoreGetFileImageParams) => Promise<string>;
    getFileBinaryURL: (id: string, collectionName?: string) => Promise<string>;
    getArtifactURL: (artifacts: MediaFileArtifacts, artifactName: "video_1280.mp4" | "video_640.mp4" | "document.pdf" | "audio.mp3", collectionName?: string) => Promise<string>;
    getImage: (id: string, params?: MediaStoreGetFileImageParams, controller?: AbortController) => Promise<Blob>;
    getItems: (ids: string[], collectionName?: string) => Promise<MediaStoreResponse<ItemsPayload>>;
    getImageMetadata: (id: string, params?: MediaStoreGetFileImageParams) => Promise<{
        metadata: ImageMetadata;
    }>;
    appendChunksToUpload(uploadId: string, body: AppendChunksToUploadRequestBody, collectionName?: string): Promise<void>;
    copyFileWithToken(body: MediaStoreCopyFileWithTokenBody, params: MediaStoreCopyFileWithTokenParams): Promise<MediaStoreResponse<MediaFile>>;
    request(path: string, options?: MediaStoreRequestOptions, controller?: AbortController): Promise<Response>;
}
export interface FileItem {
    id: string;
    type: 'file';
    details: MediaCollectionItemFullDetails;
    collection?: string;
}
export interface ItemsPayload {
    items: FileItem[];
}
export declare type ImageMetadataArtifact = {
    url?: string;
    width?: number;
    height?: number;
    size?: number;
};
export interface ImageMetadata {
    pending: boolean;
    preview?: ImageMetadataArtifact;
    original?: ImageMetadataArtifact;
}
export interface MediaStoreResponse<Data> {
    readonly data: Data;
}
export declare type MediaStoreRequestOptions = {
    readonly method?: RequestMethod;
    readonly authContext: AuthContext;
    readonly params?: RequestParams;
    readonly headers?: RequestHeaders;
    readonly body?: any;
};
export declare type MediaStoreCreateFileFromUploadParams = {
    readonly collection?: string;
    readonly occurrenceKey?: string;
    readonly expireAfter?: number;
    readonly replaceFileId?: string;
    readonly skipConversions?: boolean;
};
export declare type MediaStoreCreateFileParams = {
    readonly occurrenceKey?: string;
    readonly collection?: string;
};
export interface MediaStoreTouchFileParams {
    readonly collection?: string;
}
export interface TouchFileDescriptor {
    fileId: string;
    collection?: string;
    occurrenceKey?: string;
    expireAfter?: number;
    deletable?: boolean;
}
export interface MediaStoreTouchFileBody {
    descriptors: TouchFileDescriptor[];
}
export declare type MediaStoreCreateFileFromBinaryParams = {
    readonly replaceFileId?: string;
    readonly collection?: string;
    readonly occurrenceKey?: string;
    readonly expireAfter?: number;
    readonly skipConversions?: boolean;
    readonly name?: string;
};
export declare type MediaStoreCreateFileFromUploadConditions = {
    readonly hash: string;
    readonly size: number;
};
export declare type MediaStoreCreateFileFromUploadBody = {
    readonly uploadId: string;
    readonly name?: string;
    readonly mimeType?: string;
    readonly conditions?: MediaStoreCreateFileFromUploadConditions;
};
export declare type MediaStoreGetFileParams = {
    readonly version?: number;
    readonly collection?: string;
};
export declare type MediaStoreGetFileImageParams = {
    readonly allowAnimated?: boolean;
    readonly version?: number;
    readonly collection?: string;
    readonly width?: number;
    readonly height?: number;
    readonly mode?: 'fit' | 'full-fit' | 'crop';
    readonly upscale?: boolean;
    readonly 'max-age'?: number;
};
export declare type MediaStoreGetCollectionItemsParams = {
    readonly limit?: number;
    readonly inclusiveStartKey?: string;
    readonly sortDirection?: 'asc' | 'desc';
    readonly details?: 'minimal' | 'full';
};
export interface SourceFile {
    id: string;
    owner: ClientAltBasedAuth | AsapBasedAuth;
    collection?: string;
    version?: number;
}
export declare type MediaStoreCopyFileWithTokenBody = {
    sourceFile: SourceFile;
};
export declare type MediaStoreCopyFileWithTokenParams = {
    readonly collection?: string;
    readonly replaceFileId?: string;
    readonly occurrenceKey?: string;
};
export declare type AppendChunksToUploadRequestBody = {
    readonly chunks: string[];
    readonly hash?: string;
    readonly offset?: number;
};
export interface CreatedTouchedFile {
    fileId: string;
    uploadId: string;
}
export declare type TouchedFiles = {
    created: CreatedTouchedFile[];
};
export interface EmptyFile {
    readonly id: string;
    readonly createdAt: number;
}
