var _this = this;
import * as tslib_1 from "tslib";
import chunkinator from 'chunkinator';
import { createHasher } from './utils/hashing/hasherCreator';
var hashingFunction = function (blob) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var hasher;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createHasher()];
            case 1:
                hasher = _a.sent();
                return [2 /*return*/, hasher.hash(blob)];
        }
    });
}); };
var createProbingFunction = function (store, collection) { return function (chunks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var response, results;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.probeChunks(hashedChunks(chunks), collection)];
            case 1:
                response = _a.sent();
                results = response.data.results;
                return [2 /*return*/, Object.values(results).map(function (result) { return result.exists; })];
        }
    });
}); }; };
var createUploadingFunction = function (store, collection) {
    return function (chunk) {
        return store.uploadChunk(chunk.hash, chunk.blob, collection);
    };
};
var createProcessingFunction = function (store, deferredUploadId, collection) {
    var offset = 0;
    return function (chunks) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = store).appendChunksToUpload;
                    return [4 /*yield*/, deferredUploadId];
                case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent(),
                        {
                            chunks: hashedChunks(chunks),
                            offset: offset,
                        },
                        collection])];
                case 2:
                    _c.sent();
                    offset += chunks.length;
                    return [2 /*return*/];
            }
        });
    }); };
};
export var uploadFile = function (file, store, uploadableFileUpfrontIds, callbacks) {
    var content = file.content, collection = file.collection, name = file.name, mimeType = file.mimeType;
    var id = uploadableFileUpfrontIds.id, occurrenceKey = uploadableFileUpfrontIds.occurrenceKey, deferredUploadId = uploadableFileUpfrontIds.deferredUploadId;
    var _a = chunkinator(content, {
        hashingFunction: hashingFunction,
        hashingConcurrency: 5,
        probingBatchSize: 100,
        chunkSize: 4 * 1024 * 1024,
        uploadingConcurrency: 3,
        uploadingFunction: createUploadingFunction(store, collection),
        probingFunction: createProbingFunction(store, collection),
        processingBatchSize: 1000,
        processingFunction: createProcessingFunction(store, deferredUploadId, collection),
    }, {
        onProgress: function (progress) {
            if (callbacks) {
                callbacks.onProgress(progress);
            }
        },
    }), response = _a.response, cancel = _a.cancel;
    var onUploadFinish = (callbacks && callbacks.onUploadFinish) || (function () { });
    Promise.all([deferredUploadId, response])
        .then(function (_a) {
        var _b = tslib_1.__read(_a, 1), uploadId = _b[0];
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, store.createFileFromUpload({ uploadId: uploadId, name: name, mimeType: mimeType }, {
                            occurrenceKey: occurrenceKey,
                            collection: collection,
                            replaceFileId: id,
                        })];
                    case 1:
                        _c.sent();
                        onUploadFinish();
                        return [2 /*return*/];
                }
            });
        });
    })
        .catch(onUploadFinish);
    return { cancel: cancel };
};
var hashedChunks = function (chunks) { return chunks.map(function (chunk) { return chunk.hash; }); };
//# sourceMappingURL=uploader.js.map