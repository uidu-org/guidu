import { FileReference } from '../domain';
export declare const EDITOR_SHOW_LOADING = "EDITOR_SHOW_LOADING";
export interface EditorShowLoadingAction {
    readonly type: 'EDITOR_SHOW_LOADING';
    readonly originalFile: FileReference;
}
export declare function editorShowLoading(originalFile: FileReference): EditorShowLoadingAction;
