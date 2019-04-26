import { Action } from 'redux';
export declare const REMOVE_EVENT_PROXY = "REMOVE_EVENT_PROXY";
export interface RemoveEventProxyActionPayload {
    readonly uploadId: string;
    readonly proxyId: string;
}
export interface RemoveEventProxyAction extends Action {
    readonly type: 'REMOVE_EVENT_PROXY';
    readonly payload: RemoveEventProxyActionPayload;
}
export declare function isRemoveEventProxyAction(action: Action): action is RemoveEventProxyAction;
export declare function removeEventProxy(payload: RemoveEventProxyActionPayload): RemoveEventProxyAction;
