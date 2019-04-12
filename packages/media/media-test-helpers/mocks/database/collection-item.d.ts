import { MediaCollectionItem } from '@uidu/media-store';
export declare type CollectionItem = MediaCollectionItem & {
    readonly collectionName?: string;
    readonly blob: Blob;
};
export declare type CreateCollectionItemOptions = {
    readonly name?: string;
    readonly mimeType?: string;
    readonly collectionName?: string;
    readonly occurrenceKey?: string;
    readonly blob?: Blob;
    readonly id?: string;
};
export declare function createCollectionItem({ name, mimeType, collectionName, occurrenceKey, blob, id, }?: CreateCollectionItemOptions): CollectionItem;
