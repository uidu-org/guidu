import { Action } from 'redux';
import { EditorError } from '../domain';
export declare const EDITOR_SHOW_ERROR = "EDITOR_SHOW_ERROR";
export interface EditorShowErrorAction {
    readonly type: 'EDITOR_SHOW_ERROR';
    readonly error: EditorError;
}
export declare function isEditorShowErrorAction(action: Action): action is EditorShowErrorAction;
export declare function editorShowError(message: string, retryHandler?: () => void): EditorShowErrorAction;
