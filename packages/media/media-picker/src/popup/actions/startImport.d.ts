import { Action } from 'redux';
export declare const START_IMPORT = "START_IMPORT";
export interface StartImportAction extends Action {
    type: 'START_IMPORT';
}
export declare function isStartImportAction(action: Action): action is StartImportAction;
export declare function startImport(): StartImportAction;
