import { Action } from 'redux';
import { PopupUrls } from '../../domain';
export declare const UPDATE_POPUP_URLS = "UPDATE_POPUP_URLS";
export interface UpdatePopupUrlsAction extends Action {
    readonly type: 'UPDATE_POPUP_URLS';
    readonly urls: PopupUrls;
}
export declare const updatePopupUrls: (urls: PopupUrls) => UpdatePopupUrlsAction;
export declare function isUpdatePopupUrlsAction(action: Action): action is UpdatePopupUrlsAction;
