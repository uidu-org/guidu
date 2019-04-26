import { Action } from 'redux';
export declare const DROPZONE_DROP_IN = "DROPZONE_DROP_IN";
export interface DropzoneDropInAction {
    readonly type: 'DROPZONE_DROP_IN';
    readonly fileCount: number;
}
export declare function isDropzoneDropInAction(action: Action): action is DropzoneDropInAction;
export declare function dropzoneDropIn(fileCount: number): DropzoneDropInAction;
