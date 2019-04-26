import { Action } from 'redux';
import { FileReference } from '../domain';
export declare const EDIT_REMOTE_IMAGE = "EDIT_REMOTE_IMAGE";
export interface EditRemoteImageAction {
    readonly type: 'EDIT_REMOTE_IMAGE';
    readonly item: FileReference;
    readonly collectionName: string;
}
export declare function isEditRemoteImageAction(action: Action): action is EditRemoteImageAction;
export declare function editRemoteImage(item: FileReference, collectionName: string): EditRemoteImageAction;
