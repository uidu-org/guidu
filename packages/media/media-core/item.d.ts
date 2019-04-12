import { MediaType } from '@uidu/media-store';
export declare type MediaItemType = 'file' | 'external-image';
export interface FileItem {
    type: 'file';
    details: FileDetails;
}
export declare type FileProcessingStatus = 'pending' | 'running' | 'succeeded' | 'failed';
export interface MediaArtifact {
    processingStatus?: FileProcessingStatus;
    url?: string;
}
export declare type Artifacts = {
    [name: string]: MediaArtifact;
};
export interface FileDetails {
    id: string;
    name?: string;
    size?: number;
    mimeType?: string;
    mediaType?: MediaType;
    creationDate?: number;
    processingStatus?: FileProcessingStatus;
    artifacts?: Artifacts;
}
