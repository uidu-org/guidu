import { Action } from 'redux';
export declare const EDITOR_CLOSE = "EDITOR_CLOSE";
export declare type Selection = 'Save' | 'Close';
export interface EditorClose {
    type: string;
    selection: Selection;
}
export declare function isEditorCloseAction(action: Action): action is EditorClose;
export declare function editorClose(selection: Selection): EditorClose;
