import { Action } from 'redux';
export declare const RESET_VIEW = "RESET_VIEW";
export interface ResetViewAction extends Action {
    readonly type: 'RESET_VIEW';
}
export declare function isResetViewAction(action: Action): action is ResetViewAction;
export declare function resetView(): ResetViewAction;
