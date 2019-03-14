import { Action } from 'redux';

export const DROPZONE_DRAG_IN = 'DROPZONE_DRAG_IN';

export interface DropzoneDragInAction {
  readonly type: 'DROPZONE_DRAG_IN';
  readonly fileCount: number;
}

export function isDropzoneDragInAction(
  action: Action,
): action is DropzoneDragInAction {
  return action.type === DROPZONE_DRAG_IN;
}

export function dropzoneDragIn(fileCount: number): DropzoneDragInAction {
  return {
    type: DROPZONE_DRAG_IN,
    fileCount,
  };
}
