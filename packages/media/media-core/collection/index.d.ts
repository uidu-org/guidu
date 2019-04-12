import { MediaStore, MediaStoreGetCollectionItemsParams, MediaCollectionItem } from '@uidu/media-store';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { FileItem, FileDetails } from '../item';
export interface MediaCollectionFileItemDetails extends FileDetails {
    occurrenceKey: string;
}
export interface MediaCollectionFileItem extends FileItem {
    details: MediaCollectionFileItemDetails;
}
export interface MediaCollection {
    id: string;
    items: Array<MediaCollectionItem>;
}
export interface CollectionCacheEntry {
    items: MediaCollectionItem[];
    subject: ReplaySubject<MediaCollectionItem[]>;
    isLoadingNextPage: boolean;
    nextInclusiveStartKey?: string;
}
export declare type CollectionCache = {
    [collectionName: string]: CollectionCacheEntry;
};
export declare const collectionCache: CollectionCache;
export declare class CollectionFetcher {
    readonly mediaStore: MediaStore;
    constructor(mediaStore: MediaStore);
    private createFileStateObserver;
    private populateCache;
    private removeFromCache;
    getItems(collectionName: string, params?: MediaStoreGetCollectionItemsParams): Observable<MediaCollectionItem[]>;
    removeFile(id: string, collectionName: string, occurrenceKey?: string): Promise<void>;
    loadNextPage(collectionName: string, params?: MediaStoreGetCollectionItemsParams): Promise<void>;
}
