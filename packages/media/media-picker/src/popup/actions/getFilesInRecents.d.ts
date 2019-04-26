import { Action } from 'redux';
import { MediaCollectionItem } from '@uidu/media-store';
export declare const GET_FILES_IN_RECENTS = "GET_FILES_IN_RECENTS";
export interface GetFilesInRecentsAction extends Action {
    type: 'GET_FILES_IN_RECENTS';
}
export declare const isGetFilesInRecentsAction: (action: Action<any>) => action is GetFilesInRecentsAction;
export declare const getFilesInRecents: () => GetFilesInRecentsAction;
export declare const GET_FILES_IN_RECENTS_FULLFILLED = "GET_FILES_IN_RECENTS_FULLFILLED";
export interface GetFilesInRecentsFullfilledAction {
    readonly type: 'GET_FILES_IN_RECENTS_FULLFILLED';
    readonly items: MediaCollectionItem[];
}
export declare const isGetFilesInRecentsFullfilledAction: (action: Action<any>) => action is GetFilesInRecentsFullfilledAction;
export declare function getFilesInRecentsFullfilled(items: MediaCollectionItem[]): GetFilesInRecentsFullfilledAction;
export declare const GET_FILES_IN_RECENTS_FAILED = "GET_FILES_IN_RECENTS_FAILED";
export interface GetFilesInRecentsFailedAction {
    readonly type: 'GET_FILES_IN_RECENTS_FAILED';
}
export declare const isGetFilesInRecentsFailedAction: (action: Action<any>) => action is GetFilesInRecentsFailedAction;
export declare function getFilesInRecentsFailed(): GetFilesInRecentsFailedAction;
