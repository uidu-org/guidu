import * as tslib_1 from "tslib";
import { isRemoveEventProxyAction } from '../actions/removeEventProxy';
export default function removeEventProxy(state, action) {
    if (isRemoveEventProxyAction(action)) {
        var _a = action.payload, uploadId = _a.uploadId, proxyId = _a.proxyId;
        var uploads = tslib_1.__assign({}, state.uploads);
        var upload = uploads[uploadId];
        if (upload) {
            var proxy = upload.proxy;
            if (proxy) {
                var pos = proxy.indexOf(proxyId);
                if (pos > -1) {
                    if (proxy.length === 1) {
                        delete uploads[uploadId];
                    }
                    else {
                        proxy.splice(pos, 1);
                    }
                }
            }
        }
        return tslib_1.__assign({}, state, { uploads: uploads });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=removeEventProxy.js.map