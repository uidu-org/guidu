import * as tslib_1 from "tslib";
import { MediaStore, } from '@uidu/media-store';
import { fileStreamsCache } from '@uidu/media-core';
import { isFinalizeUploadAction, } from '../actions/finalizeUpload';
import { mapAuthToSourceFileOwner } from '../domain/source-file';
import { sendUploadEvent, } from '../actions/sendUploadEvent';
export default function (fetcher) {
    return function (store) { return function (next) { return function (action) {
        if (isFinalizeUploadAction(action)) {
            finalizeUpload(fetcher, store, action);
        }
        return next(action);
    }; }; };
}
export function finalizeUpload(fetcher, store, _a) {
    var file = _a.file, uploadId = _a.uploadId, source = _a.source, replaceFileId = _a.replaceFileId;
    var userContext = store.getState().userContext;
    return userContext.config
        .authProvider()
        .then(mapAuthToSourceFileOwner)
        .then(function (owner) {
        var sourceFile = tslib_1.__assign({}, source, { owner: owner });
        var copyFileParams = {
            store: store,
            fetcher: fetcher,
            file: file,
            uploadId: uploadId,
            sourceFile: sourceFile,
            replaceFileId: replaceFileId,
        };
        return copyFile(copyFileParams);
    });
}
function copyFile(_a) {
    var store = _a.store, fetcher = _a.fetcher, file = _a.file, uploadId = _a.uploadId, sourceFile = _a.sourceFile, replaceFileId = _a.replaceFileId;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _b, deferredIdUpfronts, tenantContext, config, collection, deferred, mediaStore, body, params, _c, _d;
        var _this = this;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = store.getState(), deferredIdUpfronts = _b.deferredIdUpfronts, tenantContext = _b.tenantContext, config = _b.config;
                    collection = config.uploadParams && config.uploadParams.collection;
                    deferred = deferredIdUpfronts[sourceFile.id];
                    mediaStore = new MediaStore({
                        authProvider: tenantContext.config.authProvider,
                    });
                    body = {
                        sourceFile: sourceFile,
                    };
                    _c = {
                        collection: collection
                    };
                    if (!replaceFileId) return [3 /*break*/, 2];
                    return [4 /*yield*/, replaceFileId];
                case 1:
                    _d = _e.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _d = undefined;
                    _e.label = 3;
                case 3:
                    params = (_c.replaceFileId = _d,
                        _c.occurrenceKey = file.occurrenceKey,
                        _c);
                    return [2 /*return*/, mediaStore
                            .copyFileWithToken(body, params)
                            .then(function (destinationFile) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var publicId, resolver, auth;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        publicId = destinationFile.data.id;
                                        if (deferred) {
                                            resolver = deferred.resolver;
                                            resolver(publicId);
                                        }
                                        store.dispatch(sendUploadEvent({
                                            event: {
                                                name: 'upload-processing',
                                                data: {
                                                    file: file,
                                                },
                                            },
                                            uploadId: uploadId,
                                        }));
                                        return [4 /*yield*/, tenantContext.config.authProvider({
                                                collectionName: collection,
                                            })];
                                    case 1:
                                        auth = _a.sent();
                                        // TODO [MS-725]: replace by context.getFile
                                        return [2 /*return*/, fetcher.pollFile(auth, publicId, collection)];
                                }
                            });
                        }); })
                            .then(function (processedDestinationFile) {
                            var subject = fileStreamsCache.get(processedDestinationFile.id);
                            // We need to cast to ReplaySubject and check for "next" method since the current
                            if (subject && subject.next) {
                                var subscription_1 = subject.subscribe({
                                    next: function (currentState) {
                                        setTimeout(function () { return subscription_1.unsubscribe(); }, 0);
                                        setTimeout(function () {
                                            var artifacts = processedDestinationFile.artifacts, mediaType = processedDestinationFile.mediaType, mimeType = processedDestinationFile.mimeType, name = processedDestinationFile.name, size = processedDestinationFile.size;
                                            subject.next(tslib_1.__assign({}, currentState, { status: 'processed', artifacts: artifacts,
                                                mediaType: mediaType,
                                                mimeType: mimeType,
                                                name: name,
                                                size: size }));
                                        }, 0);
                                    },
                                });
                            }
                            return store.dispatch(sendUploadEvent({
                                event: {
                                    name: 'upload-end',
                                    data: {
                                        file: file,
                                        public: processedDestinationFile,
                                    },
                                },
                                uploadId: uploadId,
                            }));
                        })
                            .catch(function (error) {
                            if (deferred) {
                                var rejecter = deferred.rejecter;
                                rejecter();
                            }
                            return store.dispatch(sendUploadEvent({
                                event: {
                                    name: 'upload-error',
                                    data: {
                                        file: file,
                                        error: {
                                            name: 'object_create_fail',
                                            description: error.message,
                                        },
                                    },
                                },
                                uploadId: uploadId,
                            }));
                        })];
            }
        });
    });
}
//# sourceMappingURL=finalizeUpload.js.map