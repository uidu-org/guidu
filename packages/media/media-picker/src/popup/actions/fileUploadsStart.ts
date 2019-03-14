import { Action } from 'redux';

import { UploadsStartEventPayload } from '../../domain/uploadEvent';
import { MediaFile } from '../../domain/file';

export const FILE_UPLOADS_START = 'FILE_UPLOADS_START';

export interface FileUploadsStartAction extends Action {
  readonly type: 'FILE_UPLOADS_START';
  readonly files: MediaFile[];
}

export function isFileUploadsStartAction(
  action: Action,
): action is FileUploadsStartAction {
  return action.type === FILE_UPLOADS_START;
}

export function fileUploadsStart(
  payload: UploadsStartEventPayload,
): FileUploadsStartAction {
  return {
    type: FILE_UPLOADS_START,
    files: payload.files,
  };
}
