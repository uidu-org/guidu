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
  type:
    | 'RemoteUploadStart'
    | 'RemoteUploadProgress'
    | 'RemoteUploadEnd'
    | 'NotifyMetadata'
    | 'Error';
  uploadId: string;
  // Alternative backend schema for error activities
  // Will be removed after backend unifies response schema
  data?: {
    uploadId: string;
  };
}

export interface WsRemoteUploadFailData
  extends WsUploadMessageData,
    WsErrorData {
  type: 'Error';
  error: 'RemoteUploadFail';
  // Alternative backend schema for error activities
  // Will be removed after backend unifies response schema
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

export type WsMessageData = WsUploadMessageData | WsErrorData;

export const isRemoteUploadStartData = (
  data: WsMessageData,
): data is WsRemoteUploadStartData => {
  return data && data.type === 'RemoteUploadStart';
};

export const isRemoteUploadProgressData = (
  data: WsUploadMessageData,
): data is WsRemoteUploadProgressData => {
  return data.type === 'RemoteUploadProgress';
};

export const isRemoteUploadEndData = (
  data: WsUploadMessageData,
): data is WsRemoteUploadEndData => {
  return data.type === 'RemoteUploadEnd';
};

const isErrorData = (data: WsMessageData): data is WsErrorData => {
  return data.type === 'Error';
};

export const isRemoteUploadErrorData = (
  data: WsUploadMessageData,
): data is WsRemoteUploadFailData => {
  return isErrorData(data) && data.error === 'RemoteUploadFail';
};

export const isNotifyMetadata = (
  data: WsUploadMessageData,
): data is WsNotifyMetadata => {
  return data.type === 'NotifyMetadata';
};

export const isServerError = (
  data: WsMessageData,
): data is WsServerErrorData => {
  return isErrorData(data) && data.error === 'ServerError';
};

export const isNoUserFound = (
  data: WsMessageData,
): data is WsNoUserFoundData => {
  return isErrorData(data) && data.error === 'NoUserFound';
};
