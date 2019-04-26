import { Action } from 'redux';
export declare const SHOW_POPUP = "SHOW_POPUP";
export interface ShowPopupAction extends Action {
    readonly type: 'SHOW_POPUP';
}
export declare function isShowPopupAction(action: Action): action is ShowPopupAction;
export declare function showPopup(): ShowPopupAction;
