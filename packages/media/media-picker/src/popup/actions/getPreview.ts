import { Action } from 'redux';

import { MediaFile } from '../../domain/file';

export const GET_PREVIEW = 'GET_PREVIEW';

export type GetPreviewAction = {
  readonly type: typeof GET_PREVIEW;
  readonly uploadId: string;
  readonly file: MediaFile;
  readonly collection: string;
};

export function isGetPreviewAction(action: Action): action is GetPreviewAction {
  return action.type === GET_PREVIEW;
}

export function getPreview(
  uploadId: string,
  file: MediaFile,
  collection: string,
): GetPreviewAction {
  return {
    type: GET_PREVIEW,
    uploadId,
    file,
    collection,
  };
}
