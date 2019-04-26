import { FileReference } from '../domain';
import { Action } from 'redux';
export declare const EDITOR_SHOW_IMAGE = "EDITOR_SHOW_IMAGE";
export interface EditorShowImageAction {
    readonly type: 'EDITOR_SHOW_IMAGE';
    readonly imageUrl: string;
    readonly originalFile?: FileReference;
}
export declare function isEditorShowImageAction(action: Action): action is EditorShowImageAction;
export declare function editorShowImage(imageUrl: string, originalFile?: FileReference): EditorShowImageAction;
