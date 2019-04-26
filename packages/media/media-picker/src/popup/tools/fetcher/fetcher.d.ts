import { Auth, FileDetails } from '@uidu/media-core';
import { Service, ServiceAccountWithType, ServiceFolder, ServiceName } from '../../domain';
import { MediaFile } from '@uidu/media-store';
export interface GiphyImage {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
}
export interface GiphyResponse {
    data: [{
        id: string;
        slug: string;
        images: {
            fixed_width: GiphyImage;
            original: GiphyImage;
        };
    }];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
}
export interface GiphyData {
    cardModels: ImageCardModel[];
    totalResultCount: number;
}
export interface ImageCardModel {
    metadata: FileDetails;
    dataURI: string;
    dimensions: {
        width: number;
        height: number;
    };
}
export interface Fetcher {
    fetchCloudAccountFolder(auth: Auth, serviceName: ServiceName, accountId: string, folderId: string, cursor?: string): Promise<ServiceFolder>;
    pollFile(auth: Auth, fileId: string, collection?: string): Promise<MediaFile>;
    getServiceList(auth: Auth): Promise<ServiceAccountWithType[]>;
    unlinkCloudAccount(auth: Auth, accountId: string): Promise<void>;
    fetchTrendingGifs(offset?: number): Promise<GiphyData>;
    fetchGifsRelevantToSearch(query: string, offset?: number): Promise<GiphyData>;
}
export declare class MediaApiFetcher implements Fetcher {
    constructor();
    fetchCloudAccountFolder(auth: Auth, serviceName: ServiceName, accountId: string, folderId: string, cursor?: string): Promise<ServiceFolder>;
    pollFile(auth: Auth, fileId: string, collection?: string): Promise<MediaFile>;
    getServiceList(auth: Auth): Promise<ServiceAccountWithType[]>;
    unlinkCloudAccount(auth: Auth, accountId: string): Promise<void>;
    stringifyParams(queryParams: {
        [key: string]: string | undefined | number;
    }): string;
    fetchTrendingGifs: (offset?: number) => Promise<GiphyData>;
    fetchGifsRelevantToSearch: (query: string, offset?: number) => Promise<GiphyData>;
    private mapGiphyResponseToViewModel;
    private query;
    private isFolder;
    private sortDropboxFiles;
}
export declare const fileStoreUrl: (baseUrl: string) => string;
export declare const pickerUrl: (baseUrl: string) => string;
export declare function flattenAccounts(services: Service[]): ServiceAccountWithType[];
