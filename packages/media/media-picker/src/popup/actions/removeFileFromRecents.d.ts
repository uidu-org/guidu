import { Action } from 'redux';
export declare const REMOVE_FILES_FROM_RECENTS = "REMOVE_FILES_FROM_RECENTS";
export interface RemoveFileFromRecentsAction extends Action {
    type: 'REMOVE_FILES_FROM_RECENTS';
    id: string;
    userFileId?: string;
    occurrenceKey?: string;
}
export declare const isRemoveFileFromRecentsAction: (action: Action<any>) => action is RemoveFileFromRecentsAction;
export declare const removeFileFromRecents: (id: string, occurrenceKey?: string, userFileId?: string) => RemoveFileFromRecentsAction;
