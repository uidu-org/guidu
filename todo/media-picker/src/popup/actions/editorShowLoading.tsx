import { FileReference } from '../domain';

export const EDITOR_SHOW_LOADING = 'EDITOR_SHOW_LOADING';

export interface EditorShowLoadingAction {
  readonly type: 'EDITOR_SHOW_LOADING';
  readonly originalFile: FileReference;
}

export function editorShowLoading(
  originalFile: FileReference,
): EditorShowLoadingAction {
  return {
    type: EDITOR_SHOW_LOADING,
    originalFile,
  };
}
