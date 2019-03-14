import { Action } from 'redux';

import {
  UploadPreviewUpdateEvent,
  UploadPreviewUpdateEventPayload,
} from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';

export const FILE_PREVIEW_UPDATE = 'FILE_PREVIEW_UPDATE';

export interface FileUploadPreviewUpdateAction extends Action {
  readonly type: 'FILE_PREVIEW_UPDATE';
  readonly file: MediaFile;
  readonly preview?: Blob;
  readonly originalEvent: UploadPreviewUpdateEvent;
}

export function isFileUploadPreviewUpdateAction(
  action: Action,
): action is FileUploadPreviewUpdateAction {
  return action.type === FILE_PREVIEW_UPDATE;
}

export function fileUploadPreviewUpdate(
  payload: UploadPreviewUpdateEventPayload,
): FileUploadPreviewUpdateAction {
  return {
    type: FILE_PREVIEW_UPDATE,
    file: payload.file,
    preview: payload.preview.file,
    originalEvent: {
      name: 'upload-preview-update',
      data: payload,
    },
  };
}
