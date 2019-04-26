import { Action } from 'redux';
import { CancelUploadHandler } from '../domain';
export declare const START_APP = "START_APP";
export interface StartAppActionPayload {
    readonly onCancelUpload: CancelUploadHandler;
}
export interface StartAppAction extends Action {
    readonly type: 'START_APP';
    readonly payload: StartAppActionPayload;
}
export declare function isStartAppAction(action: Action): action is StartAppAction;
export declare function startApp(payload: StartAppActionPayload): StartAppAction;
