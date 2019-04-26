import { ImageMetadata } from '@uidu/media-store';
export interface WsErrorData {
    type: 'Error';
    error: 'ServerError' | 'RemoteUploadFail' | 'NoUserFound';
    reason: string;
}
export interface WsServerErrorData extends WsErrorData {
    error: 'ServerError';
}
export interface WsNoUserFoundData extends WsErrorData {
    error: 'NoUserFound';
}
export interface WsUploadMessageData {
    type: 'RemoteUploadStart' | 'RemoteUploadProgress' | 'RemoteUploadEnd' | 'NotifyMetadata' | 'Error';
    uploadId: string;
    data?: {
        uploadId: string;
    };
}
export interface WsRemoteUploadFailData extends WsUploadMessageData, WsErrorData {
    type: 'Error';
    error: 'RemoteUploadFail';
    data?: {
        reason: string;
        uploadId: string;
    };
}
export interface WsRemoteUploadStartData extends WsUploadMessageData {
    type: 'RemoteUploadStart';
}
export interface WsRemoteUploadProgressData extends WsUploadMessageData {
    type: 'RemoteUploadProgress';
    currentAmount: number;
    totalAmount: number;
}
export interface WsRemoteUploadEndData extends WsUploadMessageData {
    type: 'RemoteUploadEnd';
    fileId: string;
}
export interface WsNotifyMetadata extends WsUploadMessageData {
    type: 'NotifyMetadata';
    metadata: ImageMetadata;
}
export declare type WsMessageData = WsUploadMessageData | WsErrorData;
export declare const isRemoteUploadStartData: (data: WsMessageData) => data is WsRemoteUploadStartData;
export declare const isRemoteUploadProgressData: (data: WsUploadMessageData) => data is WsRemoteUploadProgressData;
export declare const isRemoteUploadEndData: (data: WsUploadMessageData) => data is WsRemoteUploadEndData;
export declare const isRemoteUploadErrorData: (data: WsUploadMessageData) => data is WsRemoteUploadFailData;
export declare const isNotifyMetadata: (data: WsUploadMessageData) => data is WsNotifyMetadata;
export declare const isServerError: (data: WsMessageData) => data is WsServerErrorData;
export declare const isNoUserFound: (data: WsMessageData) => data is WsNoUserFoundData;
