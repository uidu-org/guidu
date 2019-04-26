import * as tslib_1 from "tslib";
import { isGetPreviewAction } from '../actions/getPreview';
import { sendUploadEvent } from '../actions/sendUploadEvent';
import { getPreviewFromMetadata, } from '../../domain/preview';
export default function () {
    return function (store) { return function (next) { return function (action) {
        if (isGetPreviewAction(action)) {
            getPreview(store, action);
        }
        return next(action);
    }; }; };
}
var dispatchPreviewUpdate = function (store, _a, preview) {
    var uploadId = _a.uploadId, file = _a.file;
    store.dispatch(sendUploadEvent({
        event: {
            name: 'upload-preview-update',
            data: {
                file: file,
                preview: preview,
            },
        },
        uploadId: uploadId,
    }));
};
export function getPreview(store, action) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var file, collection, userContext, subscription;
        return tslib_1.__generator(this, function (_a) {
            file = action.file, collection = action.collection;
            userContext = store.getState().userContext;
            subscription = userContext.file
                .getFileState(file.id, { collectionName: collection })
                .subscribe({
                next: function (state) {
                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                        var mediaType, metadata, preview, blob, _a, preview;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (state.status === 'error') {
                                        return [2 /*return*/];
                                    }
                                    mediaType = state.mediaType;
                                    // We need to wait for the next tick since rxjs might call "next" before returning from "subscribe"
                                    window.setTimeout(function () { return subscription.unsubscribe(); });
                                    if (!(mediaType === 'image' || mediaType === 'video')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, userContext.getImageMetadata(file.id, {
                                            collection: collection,
                                        })];
                                case 1:
                                    metadata = _b.sent();
                                    preview = getPreviewFromMetadata(metadata);
                                    dispatchPreviewUpdate(store, action, preview);
                                    return [3 /*break*/, 5];
                                case 2:
                                    _a = state.preview;
                                    if (!_a) return [3 /*break*/, 4];
                                    return [4 /*yield*/, state.preview];
                                case 3:
                                    _a = (_b.sent());
                                    _b.label = 4;
                                case 4:
                                    blob = _a;
                                    preview = {
                                        file: state.preview && blob instanceof Blob ? blob : undefined,
                                    };
                                    dispatchPreviewUpdate(store, action, preview);
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                },
            });
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=getPreview.js.map