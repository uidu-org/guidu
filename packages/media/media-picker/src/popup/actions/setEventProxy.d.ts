import { Action } from 'redux';
export declare const SET_EVENT_PROXY = "SET_EVENT_PROXY";
export interface SetEventProxyAction extends Action {
    type: 'SET_EVENT_PROXY';
    itemId: string;
    uploadId: string;
}
export declare const setEventProxy: (itemId: string, uploadId: string) => SetEventProxyAction;
