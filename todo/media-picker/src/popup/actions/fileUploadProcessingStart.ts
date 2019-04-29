import { Action } from 'redux';

import {
  UploadProcessingEvent,
  UploadProcessingEventPayload,
} from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';

export const FILE_UPLOAD_PROCESSING_START = 'FILE_UPLOAD_PROCESSING_START';

export interface FileUploadProcessingStartAction extends Action {
  readonly type: 'FILE_UPLOAD_PROCESSING_START';
  readonly file: MediaFile;
  readonly originalEvent: UploadProcessingEvent;
}

export function isFileUploadProcessingStartAction(
  action: Action,
): action is FileUploadProcessingStartAction {
  return action.type === FILE_UPLOAD_PROCESSING_START;
}

export function fileUploadProcessingStart(
  payload: UploadProcessingEventPayload,
): FileUploadProcessingStartAction {
  return {
    type: FILE_UPLOAD_PROCESSING_START,
    file: payload.file,
    originalEvent: {
      name: 'upload-processing',
      data: payload,
    },
  };
}
