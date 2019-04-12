import { ContextConfig, MediaStoreGetFileImageParams, ImageMetadata } from '@uidu/media-store';
import { CollectionFetcher } from '../collection';
import { FileFetcher } from '../file';
export interface Context {
    getImage(id: string, params?: MediaStoreGetFileImageParams, controller?: AbortController): Promise<Blob>;
    getImageMetadata(id: string, params?: MediaStoreGetFileImageParams): Promise<ImageMetadata>;
    getImageUrl(id: string, params?: MediaStoreGetFileImageParams): Promise<string>;
    readonly collection: CollectionFetcher;
    readonly file: FileFetcher;
    readonly config: ContextConfig;
}
export declare class ContextFactory {
    static create(config: ContextConfig): Context;
}
