import { Action } from 'redux';
export declare const START_FILE_BROWSER = "START_FILE_BROWSER";
export interface StartFileBrowser {
    readonly type: 'START_FILE_BROWSER';
}
export declare function isStartFileBrowserAction(action: Action): action is StartFileBrowser;
export declare function startFileBrowser(): StartFileBrowser;
