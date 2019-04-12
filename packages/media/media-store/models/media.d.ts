import { MediaFileArtifacts } from './artifacts';
export declare type MediaFileProcessingStatus = 'pending' | 'succeeded' | 'failed';
export declare type MediaType = 'doc' | 'audio' | 'video' | 'image' | 'unknown';
export declare const isPreviewableType: (type: MediaType) => boolean;
export declare type MediaFile = {
    readonly id: string;
    readonly mediaType: MediaType;
    readonly mimeType: string;
    readonly name: string;
    readonly processingStatus?: MediaFileProcessingStatus;
    readonly size: number;
    readonly artifacts: MediaFileArtifacts;
};
export declare type MediaCollection = {
    readonly name: string;
    readonly createdAt: number;
};
export declare type MediaCollectionItems = {
    readonly contents: MediaCollectionItem[];
    readonly nextInclusiveStartKey?: string;
};
export declare type MediaCollectionItem = {
    readonly id: string;
    readonly insertedAt: number;
    readonly occurrenceKey: string;
    readonly details: MediaCollectionItemDetails;
};
export declare type MediaCollectionItemMinimalDetails = {
    readonly name: string;
    readonly size: number;
};
export declare type MediaCollectionItemFullDetails = {
    readonly mediaType: MediaType;
    readonly mimeType: string;
    readonly name: string;
    readonly processingStatus: MediaFileProcessingStatus;
    readonly size: number;
    readonly artifacts: MediaFileArtifacts;
};
export declare type MediaCollectionItemDetails = MediaCollectionItemMinimalDetails | MediaCollectionItemFullDetails;
export declare type MediaUpload = {
    readonly id: string;
    readonly created: number;
    readonly expires: number;
};
export declare type MediaChunksProbe = {
    readonly results: {
        readonly [etag: string]: {
            readonly exists: boolean;
        };
    };
};
