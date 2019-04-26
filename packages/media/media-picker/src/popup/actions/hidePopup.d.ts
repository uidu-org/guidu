import { Action } from 'redux';
export declare const HIDE_POPUP = "HIDE_POPUP";
export interface HidePopupAction extends Action {
    readonly type: typeof HIDE_POPUP;
}
export declare function isHidePopupAction(action: Action): action is HidePopupAction;
export declare function hidePopup(): HidePopupAction;
