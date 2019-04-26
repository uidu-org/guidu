import { ImageMetadata } from '@uidu/media-store';
export interface RemoteUploadStartPayload {
    uploadId: string;
}
export interface RemoteUploadProgressPayload {
    uploadId: string;
    bytes: number;
    fileSize: number;
}
export interface RemoteUploadEndPayload {
    fileId: string;
    uploadId: string;
}
export interface RemoteUploadFailPayload {
    uploadId: string;
    description: string;
}
export interface NotifyMetadataPayload {
    uploadId: string;
    metadata: ImageMetadata;
}
export interface WsUploadEvents {
    RemoteUploadStart: RemoteUploadStartPayload;
    RemoteUploadProgress: RemoteUploadProgressPayload;
    RemoteUploadEnd: RemoteUploadEndPayload;
    NotifyMetadata: NotifyMetadataPayload;
    RemoteUploadFail: RemoteUploadFailPayload;
}
export declare type Handlers<T> = {
    [K in keyof T]: (payload: T[K]) => void;
};
export declare type WsUploadEventHandlers = Handlers<WsUploadEvents>;
