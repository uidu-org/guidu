import { Action } from 'redux';

export const REMOVE_EVENT_PROXY = 'REMOVE_EVENT_PROXY';

export interface RemoveEventProxyActionPayload {
  readonly uploadId: string;
  readonly proxyId: string;
}

export interface RemoveEventProxyAction extends Action {
  readonly type: 'REMOVE_EVENT_PROXY';
  readonly payload: RemoveEventProxyActionPayload;
}

export function isRemoveEventProxyAction(
  action: Action,
): action is RemoveEventProxyAction {
  return action.type === REMOVE_EVENT_PROXY;
}

export function removeEventProxy(
  payload: RemoveEventProxyActionPayload,
): RemoveEventProxyAction {
  return {
    type: REMOVE_EVENT_PROXY,
    payload,
  };
}
