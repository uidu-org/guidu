import { MediaFileArtifacts } from './artifacts';

export type MediaFileProcessingStatus = 'pending' | 'succeeded' | 'failed';
export type MediaType = 'doc' | 'audio' | 'video' | 'image' | 'unknown';
export const isPreviewableType = (type: MediaType): boolean => {
  return ['audio', 'video', 'image'].indexOf(type) > -1;
};
export type MediaFile = {
  readonly id: string;
  readonly mediaType: MediaType;
  readonly mimeType: string;
  readonly name: string;
  readonly processingStatus?: MediaFileProcessingStatus;
  readonly size: number;
  readonly artifacts: MediaFileArtifacts;
};

export type MediaCollection = {
  readonly name: string;
  readonly createdAt: number;
};

export type MediaCollectionItems = {
  readonly contents: MediaCollectionItem[];
  readonly nextInclusiveStartKey?: string;
};

export type MediaCollectionItem = {
  readonly id: string;
  readonly insertedAt: number;
  readonly occurrenceKey: string;
  readonly details: MediaCollectionItemDetails;
};

export type MediaCollectionItemMinimalDetails = {
  readonly name: string;
  readonly size: number;
};

export type MediaCollectionItemFullDetails = {
  readonly mediaType: MediaType;
  readonly mimeType: string;
  readonly name: string;
  readonly processingStatus: MediaFileProcessingStatus;
  readonly size: number;
  readonly artifacts: MediaFileArtifacts;
};

export type MediaCollectionItemDetails =
  | MediaCollectionItemMinimalDetails
  | MediaCollectionItemFullDetails;

export type MediaUpload = {
  readonly id: string;
  readonly created: number;
  readonly expires: number;
};

export type MediaChunksProbe = {
  readonly results: {
    readonly [etag: string]: {
      readonly exists: boolean;
    };
  };
};
