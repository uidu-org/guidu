import * as tslib_1 from "tslib";
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { publishReplay } from 'rxjs/operators/publishReplay';
import * as uuid from 'uuid/v4';
import * as Dataloader from 'dataloader';
import { uploadFile, } from '@uidu/media-store';
import { mapMediaItemToFileState, } from '../fileState';
import { fileStreamsCache } from '../context/fileStreamCache';
import { getMediaTypeFromUploadableFile } from '../utils/getMediaTypeFromUploadableFile';
import { convertBase64ToBlob } from '../utils/convertBase64ToBlob';
var POLLING_INTERVAL = 1000;
var maxNumberOfItemsPerCall = 100;
var makeCacheKey = function (id, collection) {
    return collection ? id + "-" + collection : id;
};
export var getItemsFromKeys = function (dataloaderKeys, fileItems) {
    var itemsByKey = fileItems.reduce(function (prev, nextFileItem) {
        var id = nextFileItem.id, collection = nextFileItem.collection;
        var key = makeCacheKey(id, collection);
        prev[key] = nextFileItem.details;
        return prev;
    }, {});
    return dataloaderKeys.map(function (dataloaderKey) {
        var id = dataloaderKey.id, collection = dataloaderKey.collection;
        var key = makeCacheKey(id, collection);
        return itemsByKey[key];
    });
};
var FileFetcherImpl = /** @class */ (function () {
    function FileFetcherImpl(mediaStore) {
        var _this = this;
        this.mediaStore = mediaStore;
        // Returns an array of the same length as the keys filled with file items
        this.batchLoadingFunc = function (keys) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var nonCollectionName, fileIdsByCollection, items;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nonCollectionName = '__media-single-file-collection__';
                        fileIdsByCollection = keys.reduce(function (prev, next) {
                            var collectionName = next.collection || nonCollectionName;
                            var fileIds = prev[collectionName] || [];
                            fileIds.push(next.id);
                            prev[collectionName] = fileIds;
                            return prev;
                        }, {});
                        items = [];
                        return [4 /*yield*/, Promise.all(Object.keys(fileIdsByCollection).map(function (collectionNameKey) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var fileIds, collectionName, response;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            fileIds = fileIdsByCollection[collectionNameKey];
                                            collectionName = collectionNameKey === nonCollectionName
                                                ? undefined
                                                : collectionNameKey;
                                            return [4 /*yield*/, this.mediaStore.getItems(fileIds, collectionName)];
                                        case 1:
                                            response = _a.sent();
                                            items.push.apply(items, tslib_1.__spread(response.data.items));
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, getItemsFromKeys(keys, items)];
                }
            });
        }); };
        this.createDownloadFileStream = function (id, collection) {
            return Observable.create(function (observer) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var timeoutId, fetchFile;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    fetchFile = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var response, fileState, e_1;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.dataloader.load({ id: id, collection: collection })];
                                case 1:
                                    response = _a.sent();
                                    if (!response) {
                                        return [2 /*return*/];
                                    }
                                    fileState = mapMediaItemToFileState(id, response);
                                    observer.next(fileState);
                                    if (fileState && fileState.status === 'processing') {
                                        timeoutId = window.setTimeout(fetchFile, POLLING_INTERVAL);
                                    }
                                    else {
                                        observer.complete();
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _a.sent();
                                    observer.error(e_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); };
                    fetchFile();
                    return [2 /*return*/, function () {
                            window.clearTimeout(timeoutId);
                        }];
                });
            }); });
        };
        this.dataloader = new Dataloader(this.batchLoadingFunc, {
            maxBatchSize: maxNumberOfItemsPerCall,
        });
    }
    FileFetcherImpl.prototype.getFileState = function (id, options) {
        // if (!isValidId(id)) {
        //   return Observable.create((observer: Observer<FileState>) => {
        //     observer.error(`${id} is not a valid file id`);
        //   });
        // }
        var _this = this;
        return fileStreamsCache.getOrInsert(id, function () {
            var collection = options && options.collectionName;
            var fileStream$ = publishReplay(1)(_this.createDownloadFileStream(id, collection));
            fileStream$.connect();
            return fileStream$;
        });
    };
    FileFetcherImpl.prototype.getCurrentState = function (id) {
        return fileStreamsCache.getCurrentState(id);
    };
    FileFetcherImpl.prototype.getArtifactURL = function (artifacts, artifactName, collectionName) {
        return this.mediaStore.getArtifactURL(artifacts, artifactName, collectionName);
    };
    FileFetcherImpl.prototype.touchFiles = function (descriptors, collection) {
        return this.mediaStore
            .touchFiles({ descriptors: descriptors }, { collection: collection })
            .then(function (_a) {
            var data = _a.data;
            return data;
        });
    };
    FileFetcherImpl.prototype.generateUploadableFileUpfrontIds = function (collection) {
        var id = uuid();
        var occurrenceKey = uuid();
        var touchFileDescriptor = {
            fileId: id,
            occurrenceKey: occurrenceKey,
            collection: collection,
        };
        var deferredUploadId = this.touchFiles([touchFileDescriptor], collection).then(function (touchedFiles) { return touchedFiles.created[0].uploadId; });
        return {
            id: id,
            occurrenceKey: occurrenceKey,
            deferredUploadId: deferredUploadId,
        };
    };
    FileFetcherImpl.prototype.upload = function (file, controller, uploadableFileUpfrontIds) {
        if (typeof file.content === 'string') {
            file.content = convertBase64ToBlob(file.content);
        }
        var content = file.content, _a = file.name, name = _a === void 0 ? '' : _a, // name property is not available in base64 image
        collection = file.collection;
        if (!uploadableFileUpfrontIds) {
            uploadableFileUpfrontIds = this.generateUploadableFileUpfrontIds(collection);
        }
        var id = uploadableFileUpfrontIds.id;
        var occurrenceKey = uploadableFileUpfrontIds.occurrenceKey;
        var mimeType = '';
        var size = 0;
        var preview;
        // TODO [MSW-796]: get file size for base64
        var mediaType = getMediaTypeFromUploadableFile(file);
        var subject = new ReplaySubject(1);
        if (content instanceof Blob) {
            size = content.size;
            mimeType = content.type;
            preview = {
                value: content,
            };
        }
        var stateBase = {
            name: name,
            size: size,
            mediaType: mediaType,
            mimeType: mimeType,
            id: id,
            occurrenceKey: occurrenceKey,
            preview: preview,
        };
        var onProgress = function (progress) {
            subject.next(tslib_1.__assign({ status: 'uploading' }, stateBase, { progress: progress }));
        };
        var onUploadFinish = function (error) {
            if (error) {
                return subject.error(error);
            }
            subject.next(tslib_1.__assign({ status: 'processing' }, stateBase));
            subject.complete();
        };
        var cancel = uploadFile(file, this.mediaStore, uploadableFileUpfrontIds, {
            onUploadFinish: onUploadFinish,
            onProgress: onProgress,
        }).cancel;
        fileStreamsCache.set(id, subject);
        // We should report progress asynchronously, since this is what consumer expects
        // (otherwise in newUploadService file-converting event will be emitted before files-added)
        setTimeout(function () {
            onProgress(0);
        }, 0);
        if (controller) {
            controller.setAbort(cancel);
        }
        return subject;
    };
    FileFetcherImpl.prototype.downloadBinary = function (id, name, collectionName) {
        if (name === void 0) { name = 'download'; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isIE11, iframeName, link, iframe, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isIE11 = !!window.MSInputMethodContext &&
                            !!document.documentMode;
                        iframeName = 'media-download-iframe';
                        link = document.createElement('a');
                        iframe = document.getElementById(iframeName);
                        if (!iframe) {
                            iframe = document.createElement('iframe');
                            iframe.style.display = 'none';
                            iframe.id = iframeName;
                            iframe.name = iframeName;
                            document.body.appendChild(iframe);
                        }
                        _a = link;
                        return [4 /*yield*/, this.mediaStore.getFileBinaryURL(id, collectionName)];
                    case 1:
                        _a.href = _b.sent();
                        link.download = name;
                        link.target = isIE11 ? '_blank' : iframeName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileFetcherImpl;
}());
export { FileFetcherImpl };
//# sourceMappingURL=index.js.map