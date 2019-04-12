import { Observable } from 'rxjs/Observable';
import { MediaStore, UploadableFile, UploadController, MediaCollectionItemFullDetails, FileItem, MediaFileArtifacts, TouchFileDescriptor, TouchedFiles, UploadableFileUpfrontIds } from '@uidu/media-store';
import { FileState, GetFileOptions } from '../fileState';
export declare type DataloaderMap = {
    [id: string]: DataloaderResult;
};
export declare const getItemsFromKeys: (dataloaderKeys: DataloaderKey[], fileItems: FileItem[]) => MediaCollectionItemFullDetails[];
interface DataloaderKey {
    id: string;
    collection?: string;
}
declare type DataloaderResult = MediaCollectionItemFullDetails | undefined;
export interface FileFetcher {
    getFileState(id: string, options?: GetFileOptions): Observable<FileState>;
    getArtifactURL(artifacts: MediaFileArtifacts, artifactName: keyof MediaFileArtifacts, collectionName?: string): Promise<string>;
    touchFiles(descriptors: TouchFileDescriptor[], collection?: string): Promise<TouchedFiles>;
    upload(file: UploadableFile, controller?: UploadController, uploadableFileUpfrontIds?: UploadableFileUpfrontIds): Observable<FileState>;
    downloadBinary(id: string, name?: string, collectionName?: string): Promise<void>;
    getCurrentState(id: string): Promise<FileState>;
}
export declare class FileFetcherImpl implements FileFetcher {
    private readonly mediaStore;
    private readonly dataloader;
    constructor(mediaStore: MediaStore);
    private batchLoadingFunc;
    getFileState(id: string, options?: GetFileOptions): Observable<FileState>;
    getCurrentState(id: string): Promise<FileState>;
    getArtifactURL(artifacts: MediaFileArtifacts, artifactName: keyof MediaFileArtifacts, collectionName?: string): Promise<string>;
    private createDownloadFileStream;
    touchFiles(descriptors: TouchFileDescriptor[], collection?: string): Promise<TouchedFiles>;
    private generateUploadableFileUpfrontIds;
    upload(file: UploadableFile, controller?: UploadController, uploadableFileUpfrontIds?: UploadableFileUpfrontIds): Observable<FileState>;
    downloadBinary(id: string, name?: string, collectionName?: string): Promise<void>;
}
export {};
