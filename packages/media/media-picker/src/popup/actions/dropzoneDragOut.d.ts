import { Action } from 'redux';
export declare const DROPZONE_DRAG_OUT = "DROPZONE_DRAG_OUT";
export interface DropzoneDragOutAction {
    readonly type: 'DROPZONE_DRAG_OUT';
    readonly fileCount: number;
}
export declare function isDropzoneDragOutAction(action: Action): action is DropzoneDragOutAction;
export declare function dropzoneDragOut(fileCount: number): DropzoneDragOutAction;
