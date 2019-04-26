import * as tslib_1 from "tslib";
export default function setEventProxy(state, action) {
    if (action.type === 'SET_EVENT_PROXY') {
        var itemId = action.itemId, uploadId = action.uploadId;
        var uploads = state.uploads;
        var upload = uploads[itemId];
        if (upload) {
            if (upload.proxy) {
                upload.proxy.push(uploadId);
            }
            else {
                upload.proxy = [uploadId];
            }
        }
        return tslib_1.__assign({}, state, { uploads: uploads });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=setEventProxy.js.map