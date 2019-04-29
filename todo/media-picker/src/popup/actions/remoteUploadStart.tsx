import { Action } from 'redux';

export const REMOTE_UPLOAD_START = 'REMOTE_UPLOAD_START';

export interface RemoteUploadStartAction extends Action {
  readonly type: 'REMOTE_UPLOAD_START';
  readonly uploadId: string;
}

export function remoteUploadStart(uploadId: string): RemoteUploadStartAction {
  return {
    type: REMOTE_UPLOAD_START,
    uploadId,
  };
}
