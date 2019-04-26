import { Action } from 'redux';
export declare const DROPZONE_DRAG_IN = "DROPZONE_DRAG_IN";
export interface DropzoneDragInAction {
    readonly type: 'DROPZONE_DRAG_IN';
    readonly fileCount: number;
}
export declare function isDropzoneDragInAction(action: Action): action is DropzoneDragInAction;
export declare function dropzoneDragIn(fileCount: number): DropzoneDragInAction;
