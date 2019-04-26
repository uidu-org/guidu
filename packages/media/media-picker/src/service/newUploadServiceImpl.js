import * as tslib_1 from "tslib";
import * as uuid from 'uuid';
import { getMediaTypeFromMimeType, ContextFactory, fileStreamsCache, } from '@uidu/media-core';
import { MediaStore, UploadController, } from '@uidu/media-store';
import { EventEmitter2 } from 'eventemitter2';
import { map } from 'rxjs/operators/map';
import { RECENTS_COLLECTION } from '../popup/config';
import { mapAuthToSourceFileOwner } from '../popup/domain/source-file';
import { getPreviewFromImage } from '../util/getPreviewFromImage';
import { SmartMediaProgress } from '../domain/progress';
import { LocalFileSource } from '../service/types';
import { getPreviewFromBlob } from '../util/getPreviewFromBlob';
var NewUploadServiceImpl = /** @class */ (function () {
    function NewUploadServiceImpl(tenantContext, tenantUploadParams, shouldCopyFileToRecents) {
        var _this = this;
        this.tenantContext = tenantContext;
        this.tenantUploadParams = tenantUploadParams;
        this.shouldCopyFileToRecents = shouldCopyFileToRecents;
        this.emit = function (event, payload) {
            _this.emitter.emit(event, payload);
        };
        this.onFileSuccess = function (cancellableFileUpload, fileId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var mediaFile, details;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                mediaFile = cancellableFileUpload.mediaFile;
                this.copyFileToUsersCollection(fileId)
                    // tslint:disable-next-line:no-console
                    .catch(console.log); // We intentionally swallow these errors
                this.emit('file-converting', {
                    file: mediaFile,
                });
                details = {
                    id: fileId,
                };
                this.emit('file-converted', {
                    file: mediaFile,
                    public: details,
                });
                cancellableFileUpload.cancel = function () {
                    _this.releaseCancellableFile(mediaFile);
                };
                return [2 /*return*/];
            });
        }); };
        this.onFileProgress = function (_a, portion) {
            var mediaFile = _a.mediaFile, file = _a.file;
            var size = file.size;
            var progress = new SmartMediaProgress(size, size * portion, mediaFile.creationDate, Date.now());
            _this.emit('file-uploading', {
                file: mediaFile,
                progress: progress.toJSON(),
            });
        };
        this.onFileError = function (mediaFile, mediaErrorName, error) {
            _this.releaseCancellableFile(mediaFile);
            if (error === 'canceled') {
                // Specific error coming from chunkinator via rejected fileId promise.
                // We do not want to trigger error in this case.
                return;
            }
            var description = error instanceof Error ? error.message : error;
            _this.emit('file-upload-error', {
                file: mediaFile,
                error: {
                    fileId: mediaFile.id,
                    description: description,
                    name: mediaErrorName,
                },
            });
        };
        this.emitter = new EventEmitter2();
        this.cancellableFilesUploads = {};
        var _a = tenantContext.config, tenantAuthProvider = _a.authProvider, userAuthProvider = _a.userAuthProvider;
        // We need a non user auth store, since we want to create the empty file in the public collection
        this.tenantMediaStore = new MediaStore({
            authProvider: tenantAuthProvider,
        });
        if (userAuthProvider) {
            this.userMediaStore = new MediaStore({
                authProvider: userAuthProvider,
            });
            // We need to use the userAuth to upload this file (recents)
            this.userContext = ContextFactory.create({
                userAuthProvider: userAuthProvider,
                authProvider: userAuthProvider,
            });
        }
    }
    NewUploadServiceImpl.prototype.setUploadParams = function (uploadParams) {
        this.tenantUploadParams = uploadParams;
    };
    // Used for testing
    NewUploadServiceImpl.prototype.createUploadController = function () {
        return new UploadController();
    };
    NewUploadServiceImpl.prototype.addFiles = function (files) {
        this.addFilesWithSource(files.map(function (file) { return ({
            file: file,
            source: LocalFileSource.LocalUpload,
        }); }));
    };
    NewUploadServiceImpl.prototype.addFilesWithSource = function (files) {
        var _this = this;
        if (files.length === 0) {
            return;
        }
        var creationDate = Date.now();
        var _a = this, userContext = _a.userContext, tenantContext = _a.tenantContext, shouldCopyFileToRecents = _a.shouldCopyFileToRecents;
        var context = shouldCopyFileToRecents ? tenantContext : userContext;
        var collection = shouldCopyFileToRecents
            ? this.tenantUploadParams.collection
            : RECENTS_COLLECTION;
        if (!context) {
            return;
        }
        var touchFileDescriptors = [];
        for (var i = 0; i < files.length; i++) {
            touchFileDescriptors.push({
                fileId: uuid.v4(),
                occurrenceKey: uuid.v4(),
                collection: collection,
            });
        }
        var promisedTouchFiles = context.file.touchFiles(touchFileDescriptors, collection);
        var cancellableFileUploads = files.map(function (fileWithSource, i) {
            var file = fileWithSource.file, source = fileWithSource.source;
            var _a = touchFileDescriptors[i], id = _a.fileId, occurrenceKey = _a.occurrenceKey;
            var deferredUploadId = promisedTouchFiles.then(function (touchedFiles) {
                var touchedFile = touchedFiles.created.find(function (touchedFile) { return touchedFile.fileId === id; });
                if (!touchedFile) {
                    throw new Error('Cant retrieve uploadId from result of touch endpoint call');
                }
                return touchedFile.uploadId;
            });
            var uploadableFile = {
                collection: collection,
                content: file,
                name: file.name,
                mimeType: file.type,
            };
            var uploadableUpfrontIds = {
                id: id,
                occurrenceKey: occurrenceKey,
                deferredUploadId: deferredUploadId,
            };
            var controller = _this.createUploadController();
            var observable = context.file.upload(uploadableFile, controller, uploadableUpfrontIds);
            var userUpfrontId;
            var userOccurrenceKey;
            var upfrontId = Promise.resolve(id);
            if (!shouldCopyFileToRecents) {
                var tenantOccurrenceKey = uuid.v4();
                var collection_1 = _this.tenantUploadParams.collection;
                var options = {
                    collection: collection_1,
                    occurrenceKey: tenantOccurrenceKey,
                };
                // We want to create an empty file in the tenant collection
                // TODO [MS-1355]: using context.file.touchFiles instead of createFile will speed up things
                // since we can lookup the id in the cache without wait for this to finish
                upfrontId = _this.tenantMediaStore
                    .createFile(options)
                    .then(function (response) { return response.data.id; });
                userUpfrontId = Promise.resolve(id);
                userOccurrenceKey = Promise.resolve(occurrenceKey);
            }
            var mediaFile = {
                id: id,
                upfrontId: upfrontId,
                userUpfrontId: userUpfrontId,
                userOccurrenceKey: userOccurrenceKey,
                name: file.name,
                size: file.size,
                creationDate: creationDate,
                type: file.type,
                occurrenceKey: occurrenceKey,
            };
            var cancellableFileUpload = {
                mediaFile: mediaFile,
                file: file,
                source: source,
                cancel: function () {
                    // we can't do "cancellableFileUpload.cancel = controller.abort" because will change the "this" context
                    controller.abort();
                },
            };
            var subscription = observable.subscribe({
                next: function (state) {
                    if (state.status === 'uploading') {
                        _this.onFileProgress(cancellableFileUpload, state.progress);
                    }
                    if (state.status === 'processing') {
                        subscription.unsubscribe();
                        _this.onFileSuccess(cancellableFileUpload, id);
                    }
                },
                error: function (error) {
                    _this.onFileError(mediaFile, 'upload_fail', error);
                },
            });
            _this.cancellableFilesUploads[id] = cancellableFileUpload;
            // Save observable in the cache
            // We want to save the observable without collection too, due consumers using cards without collection.
            fileStreamsCache.set(id, observable);
            upfrontId.then(function (id) {
                // We assign the tenant id to the observable to not emit user id instead
                var tenantObservable = observable.pipe(map(function (file) { return (tslib_1.__assign({}, file, { id: id })); }));
                fileStreamsCache.set(id, tenantObservable);
            });
            return cancellableFileUpload;
        });
        var mediaFiles = cancellableFileUploads.map(function (cancellableFileUpload) { return cancellableFileUpload.mediaFile; });
        this.emit('files-added', { files: mediaFiles });
        this.emitPreviews(cancellableFileUploads);
    };
    NewUploadServiceImpl.prototype.cancel = function (id) {
        var _this = this;
        if (id) {
            var cancellableFileUpload = this.cancellableFilesUploads[id];
            if (cancellableFileUpload && cancellableFileUpload.cancel) {
                cancellableFileUpload.cancel();
            }
        }
        else {
            Object.keys(this.cancellableFilesUploads).forEach(function (key) {
                var cancellableFileUpload = _this.cancellableFilesUploads[key];
                if (cancellableFileUpload.cancel) {
                    cancellableFileUpload.cancel();
                }
            });
        }
    };
    NewUploadServiceImpl.prototype.on = function (event, listener) {
        this.emitter.on(event, listener);
    };
    NewUploadServiceImpl.prototype.off = function (event, listener) {
        this.emitter.off(event, listener);
    };
    NewUploadServiceImpl.prototype.emitPreviews = function (cancellableFileUploads) {
        var _this = this;
        cancellableFileUploads.forEach(function (cancellableFileUpload) {
            var file = cancellableFileUpload.file, mediaFile = cancellableFileUpload.mediaFile, source = cancellableFileUpload.source;
            var mediaType = _this.getMediaTypeFromFile(file);
            if (mediaType === 'image') {
                getPreviewFromImage(file, source === LocalFileSource.PastedScreenshot
                    ? window.devicePixelRatio
                    : undefined).then(function (preview) {
                    _this.emit('file-preview-update', {
                        file: mediaFile,
                        preview: preview,
                    });
                });
            }
            else {
                getPreviewFromBlob(file, mediaType).then(function (preview) {
                    _this.emit('file-preview-update', {
                        file: mediaFile,
                        preview: preview,
                    });
                });
            }
        });
    };
    NewUploadServiceImpl.prototype.getMediaTypeFromFile = function (file) {
        var type = file.type;
        return getMediaTypeFromMimeType(type);
    };
    NewUploadServiceImpl.prototype.releaseCancellableFile = function (mediaFile) {
        delete this.cancellableFilesUploads[mediaFile.id];
    };
    // This method copies the file from the "tenant collection" to the "user collection" (recents).
    // that means we need "tenant auth" as input and "user auth" as output
    NewUploadServiceImpl.prototype.copyFileToUsersCollection = function (sourceFileId) {
        var _a = this, shouldCopyFileToRecents = _a.shouldCopyFileToRecents, userMediaStore = _a.userMediaStore, tenantUploadParams = _a.tenantUploadParams;
        if (!shouldCopyFileToRecents || !userMediaStore) {
            return Promise.resolve();
        }
        var sourceCollection = tenantUploadParams.collection;
        var tenantAuthProvider = this.tenantContext.config.authProvider;
        return tenantAuthProvider({ collectionName: sourceCollection }).then(function (auth) {
            var body = {
                sourceFile: {
                    id: sourceFileId,
                    collection: sourceCollection,
                    owner: tslib_1.__assign({}, mapAuthToSourceFileOwner(auth)),
                },
            };
            var params = {
                collection: RECENTS_COLLECTION,
            };
            return userMediaStore.copyFileWithToken(body, params);
        });
    };
    return NewUploadServiceImpl;
}());
export { NewUploadServiceImpl };
//# sourceMappingURL=newUploadServiceImpl.js.map