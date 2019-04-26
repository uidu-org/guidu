export var HANDLE_CLOUD_FETCHING_EVENT = 'HANDLE_CLOUD_FETCHING_EVENT';
export function isHandleCloudFetchingEventAction(action) {
    return action.type === HANDLE_CLOUD_FETCHING_EVENT;
}
export function handleCloudFetchingEvent(file, event, payload) {
    return {
        type: HANDLE_CLOUD_FETCHING_EVENT,
        file: file,
        event: event,
        payload: payload,
    };
}
//# sourceMappingURL=handleCloudFetchingEvent.js.map