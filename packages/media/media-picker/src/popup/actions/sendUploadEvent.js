export var SEND_UPLOAD_EVENT = 'SEND_UPLOAD_EVENT';
export function isSendUploadEventAction(action) {
    return action.type === SEND_UPLOAD_EVENT;
}
export function sendUploadEvent(payload) {
    return {
        type: SEND_UPLOAD_EVENT,
        payload: payload,
    };
}
//# sourceMappingURL=sendUploadEvent.js.map