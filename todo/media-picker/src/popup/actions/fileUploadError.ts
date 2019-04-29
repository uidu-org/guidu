import { Action } from 'redux';

import { MediaError } from '../../domain/error';
import {
  UploadErrorEvent,
  UploadErrorEventPayload,
} from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';

export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';

export interface FileUploadErrorAction extends Action {
  readonly type: 'FILE_UPLOAD_ERROR';
  readonly file: MediaFile;
  readonly error: MediaError;
  readonly originalEvent: UploadErrorEvent;
}

export function isFileUploadErrorAction(
  action: Action,
): action is FileUploadErrorAction {
  return action.type === FILE_UPLOAD_ERROR;
}

export function fileUploadError(
  payload: UploadErrorEventPayload,
): FileUploadErrorAction {
  return {
    type: FILE_UPLOAD_ERROR,
    file: payload.file,
    error: payload.error,
    originalEvent: {
      name: 'upload-error',
      data: payload,
    },
  };
}
