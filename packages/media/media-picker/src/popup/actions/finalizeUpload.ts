import { Action } from 'redux';
import { MediaFile } from '../../domain/file';

export const FINALIZE_UPLOAD = 'FINALIZE_UPLOAD';

export interface FinalizeUploadSource {
  readonly id: string;
  readonly collection?: string;
}

export interface FinalizeUploadAction extends Action {
  readonly type: typeof FINALIZE_UPLOAD;
  readonly file: MediaFile;
  readonly uploadId: string;
  readonly source: FinalizeUploadSource;
  readonly replaceFileId?: Promise<string> | string;
  readonly occurrenceKey?: string;
}

export function isFinalizeUploadAction(
  action: Action,
): action is FinalizeUploadAction {
  return action.type === FINALIZE_UPLOAD;
}

export function finalizeUpload(
  file: MediaFile,
  uploadId: string,
  source: FinalizeUploadSource,
  replaceFileId?: Promise<string> | string,
): FinalizeUploadAction {
  return {
    type: FINALIZE_UPLOAD,
    file,
    uploadId,
    source,
    replaceFileId,
  };
}
