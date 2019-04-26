export var REMOVE_EVENT_PROXY = 'REMOVE_EVENT_PROXY';
export function isRemoveEventProxyAction(action) {
    return action.type === REMOVE_EVENT_PROXY;
}
export function removeEventProxy(payload) {
    return {
        type: REMOVE_EVENT_PROXY,
        payload: payload,
    };
}
//# sourceMappingURL=removeEventProxy.js.map