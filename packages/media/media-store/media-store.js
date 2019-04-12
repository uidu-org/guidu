import * as tslib_1 from "tslib";
import { request, createUrl, mapResponseToJson, mapResponseToVoid, mapResponseToBlob, } from './utils/request';
import { getArtifactUrl } from './models/artifacts';
var defaultImageOptions = {
    'max-age': 3600,
    allowAnimated: true,
    mode: 'crop',
};
var defaultGetCollectionItems = {
    limit: 30,
    sortDirection: 'desc',
};
var extendImageParams = function (params) {
    return tslib_1.__assign({}, defaultImageOptions, params);
};
var jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
var MediaStore = /** @class */ (function () {
    function MediaStore(config) {
        var _this = this;
        this.config = config;
        this.getFile = function (fileId, params) {
            if (params === void 0) { params = {}; }
            return _this.request("/file/" + fileId, {
                params: params,
                authContext: { collectionName: params.collection },
            }).then(mapResponseToJson);
        };
        this.getFileImageURL = function (id, params) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var auth;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.config.authProvider()];
                    case 1:
                        auth = _a.sent();
                        return [2 /*return*/, createUrl(auth.baseUrl + "/file/" + id + "/image", {
                                params: extendImageParams(params),
                                auth: auth,
                            })];
                }
            });
        }); };
        this.getFileBinaryURL = function (id, collectionName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var auth;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.config.authProvider({ collectionName: collectionName })];
                    case 1:
                        auth = _a.sent();
                        return [2 /*return*/, createUrl(auth.baseUrl + "/file/" + id + "/binary", {
                                params: { dl: true, collection: collectionName },
                                auth: auth,
                            })];
                }
            });
        }); };
        this.getArtifactURL = function (artifacts, artifactName, collectionName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var artifactUrl, auth;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        artifactUrl = getArtifactUrl(artifacts, artifactName);
                        if (!artifactUrl) {
                            throw new Error("artifact " + artifactName + " not found");
                        }
                        return [4 /*yield*/, this.config.authProvider({ collectionName: collectionName })];
                    case 1:
                        auth = _a.sent();
                        return [2 /*return*/, createUrl("" + auth.baseUrl + artifactUrl, {
                                params: { collection: collectionName },
                                auth: auth,
                            })];
                }
            });
        }); };
        // TODO [MS-1352]: add WEBP header
        this.getImage = function (id, params, controller) {
            console.log(id);
            return _this.request("/file/" + id + "/image", {
                params: extendImageParams(params),
                authContext: { collectionName: params && params.collection },
            }, controller).then(mapResponseToBlob);
        };
        this.getItems = function (ids, collectionName) {
            var descriptors = ids.map(function (id) { return ({
                type: 'file',
                id: id,
                collection: collectionName,
            }); });
            return _this.request('/items', {
                method: 'POST',
                body: JSON.stringify({ descriptors: descriptors }),
                headers: jsonHeaders,
                authContext: { collectionName: collectionName },
            }).then(mapResponseToJson);
        };
        this.getImageMetadata = function (id, params) {
            return _this.request("/file/" + id + "/image/metadata", {
                params: params,
                authContext: { collectionName: params && params.collection },
            }).then(mapResponseToJson);
        };
    }
    MediaStore.prototype.createCollection = function (collectionName) {
        return this.request('/collection', {
            method: 'POST',
            body: JSON.stringify({ name: collectionName }),
            authContext: { collectionName: collectionName },
            headers: jsonHeaders,
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.getCollection = function (collectionName) {
        return this.request("/collection/" + collectionName, {
            authContext: { collectionName: collectionName },
            headers: {
                Accept: 'application/json',
            },
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.getCollectionItems = function (collectionName, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, _a, contents, nextInclusiveStartKey, contentsWithoutEmptyFiles;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.request("/collection/" + collectionName + "/items", {
                            authContext: { collectionName: collectionName },
                            params: tslib_1.__assign({}, defaultGetCollectionItems, params),
                            headers: {
                                Accept: 'application/json',
                            },
                        })];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, mapResponseToJson(response)];
                    case 2:
                        _a = (_b.sent()).data, contents = _a.contents, nextInclusiveStartKey = _a.nextInclusiveStartKey;
                        contentsWithoutEmptyFiles = contents.filter(function (item) { return item.details.size && item.details.size > 0; });
                        return [2 /*return*/, {
                                data: {
                                    contents: contentsWithoutEmptyFiles,
                                    nextInclusiveStartKey: nextInclusiveStartKey,
                                },
                            }];
                }
            });
        });
    };
    MediaStore.prototype.removeCollectionFile = function (id, collectionName, occurrenceKey) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            actions: [
                                {
                                    action: 'remove',
                                    item: {
                                        type: 'file',
                                        id: id,
                                        occurrenceKey: occurrenceKey,
                                    },
                                },
                            ],
                        };
                        return [4 /*yield*/, this.request("/collection/" + collectionName, {
                                method: 'PUT',
                                authContext: { collectionName: collectionName },
                                body: JSON.stringify(body),
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaStore.prototype.createUpload = function (createUpTo, collectionName) {
        if (createUpTo === void 0) { createUpTo = 1; }
        return this.request("/upload", {
            method: 'POST',
            authContext: { collectionName: collectionName },
            params: {
                createUpTo: createUpTo,
            },
            headers: {
                Accept: 'application/json',
            },
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.uploadChunk = function (etag, blob, collectionName) {
        return this.request("/chunk/" + etag, {
            method: 'PUT',
            authContext: { collectionName: collectionName },
            body: blob,
        }).then(mapResponseToVoid);
    };
    MediaStore.prototype.probeChunks = function (chunks, collectionName) {
        return this.request("/chunk/probe", {
            method: 'POST',
            authContext: { collectionName: collectionName },
            body: JSON.stringify({
                chunks: chunks,
            }),
            headers: jsonHeaders,
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.createFileFromUpload = function (body, params) {
        if (params === void 0) { params = {}; }
        return this.request('/file/upload', {
            method: 'POST',
            authContext: { collectionName: params.collection },
            params: params,
            body: JSON.stringify(body),
            headers: jsonHeaders,
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.touchFiles = function (body, params) {
        if (params === void 0) { params = {}; }
        return this.request('/upload/createWithFiles', {
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(body),
            authContext: { collectionName: params.collection },
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.createFile = function (params) {
        if (params === void 0) { params = {}; }
        return this.request('/file', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            params: params,
            authContext: { collectionName: params.collection },
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.createFileFromBinary = function (blob, params) {
        if (params === void 0) { params = {}; }
        return this.request('/file/binary', {
            method: 'POST',
            body: blob,
            params: params,
            headers: {
                Accept: 'application/json',
                'Content-Type': blob.type,
            },
            authContext: { collectionName: params.collection },
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.appendChunksToUpload = function (uploadId, body, collectionName) {
        return this.request("/upload/" + uploadId + "/chunks", {
            method: 'PUT',
            authContext: { collectionName: collectionName },
            body: JSON.stringify(body),
            headers: jsonHeaders,
        }).then(mapResponseToVoid);
    };
    MediaStore.prototype.copyFileWithToken = function (body, params) {
        return this.request('/file/copy/withToken', {
            method: 'POST',
            authContext: { collectionName: params.collection },
            body: JSON.stringify(body),
            headers: jsonHeaders,
            params: params,
        }).then(mapResponseToJson);
    };
    MediaStore.prototype.request = function (path, options, controller) {
        if (options === void 0) { options = {
            method: 'GET',
            authContext: {},
        }; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var authProvider, method, authContext, params, headers, body, auth;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authProvider = this.config.authProvider;
                        method = options.method, authContext = options.authContext, params = options.params, headers = options.headers, body = options.body;
                        return [4 /*yield*/, authProvider(authContext)];
                    case 1:
                        auth = _a.sent();
                        return [2 /*return*/, request("" + auth.baseUrl + path, {
                                method: method,
                                auth: auth,
                                params: params,
                                headers: headers,
                                body: body,
                            }, controller)];
                }
            });
        });
    };
    return MediaStore;
}());
export { MediaStore };
//# sourceMappingURL=media-store.js.map