var _this = this;
import * as tslib_1 from "tslib";
import * as React from 'react';
import { shallow } from 'enzyme';
import { asMock, expectFunctionToHaveBeenCalledWith, expectToEqual, fakeContext, } from '@uidu/media-test-helpers';
import * as uuid from 'uuid';
import { Shortcut } from '@uidu/media-ui';
import Spinner from '@uidu/spinner';
import { SmartMediaEditor, } from '../smartMediaEditor';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import EditorView from '../editorView/editorView';
import ErrorView from '../editorView/errorView/errorView';
describe('Smart Media Editor', function () {
    var fileIdPromise;
    var fileId;
    var fileIdentifier;
    var onFinish;
    var onUploadStart;
    var context;
    var component;
    var givenFileStateObservable;
    var formatMessage;
    beforeEach(function () {
        formatMessage = jest.fn();
        var fakeIntl = { formatMessage: formatMessage };
        fileId = 'some-file-id';
        fileIdPromise = Promise.resolve(fileId);
        fileIdentifier = {
            id: fileIdPromise,
            mediaItemType: 'file',
            collectionName: 'some-collection-name',
            occurrenceKey: 'some-occurrence-key',
        };
        onFinish = jest.fn();
        onUploadStart = jest.fn();
        context = fakeContext();
        givenFileStateObservable = new ReplaySubject(1);
        asMock(context.file.getFileState).mockReturnValue(givenFileStateObservable);
        component = shallow(React.createElement(SmartMediaEditor, { context: context, identifier: fileIdentifier, onFinish: onFinish, onUploadStart: onUploadStart, intl: fakeIntl }));
        jest
            .spyOn(uuid, 'v4')
            .mockReturnValueOnce('uuid1')
            .mockReturnValueOnce('uuid2')
            .mockReturnValueOnce('uuid3')
            .mockReturnValueOnce('uuid4');
    });
    it('should call onFinish when escape pressed', function () {
        var shortcut = component.find(Shortcut);
        var _a = shortcut.props(), keyCode = _a.keyCode, handler = _a.handler;
        expectToEqual(keyCode, 27);
        handler();
        expect(onFinish).toHaveBeenCalled();
    });
    it('should display spinner on initial render', function () {
        expect(component.find(Spinner)).toHaveLength(1);
    });
    it('should call getFileState for given file', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var collectionName, occurrenceKey;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collectionName = fileIdentifier.collectionName, occurrenceKey = fileIdentifier.occurrenceKey;
                    return [4 /*yield*/, fileIdPromise];
                case 1:
                    _a.sent();
                    expectFunctionToHaveBeenCalledWith(context.file.getFileState, [
                        fileId,
                        {
                            collectionName: collectionName,
                            occurrenceKey: occurrenceKey,
                        },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    var forFileToBeProcessed = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var imageUrlPromise;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageUrlPromise = Promise.resolve('some-image-url');
                    asMock(context.getImageUrl).mockReturnValue(imageUrlPromise);
                    givenFileStateObservable.next({
                        status: 'processed',
                        id: fileId,
                        occurrenceKey: 'some-occurrence-key',
                        mediaType: 'image',
                        mimeType: 'image/gif',
                        name: 'some-name',
                        size: 42,
                        artifacts: {},
                    });
                    return [4 /*yield*/, fileIdPromise];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, imageUrlPromise];
                case 2:
                    _a.sent();
                    component.update();
                    return [2 /*return*/];
            }
        });
    }); };
    describe('when incoming file is processed', function () {
        beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, forFileToBeProcessed()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should render EditorView', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var editorView, imageUrl;
            return tslib_1.__generator(this, function (_a) {
                editorView = component.find(EditorView);
                expect(editorView).toHaveLength(1);
                imageUrl = editorView.props().imageUrl;
                expectToEqual(imageUrl, 'some-image-url');
                return [2 /*return*/];
            });
        }); });
        it('should call context.getImageUrl', function () {
            expectFunctionToHaveBeenCalledWith(context.getImageUrl, [
                fileId,
                {
                    collection: fileIdentifier.collectionName,
                    mode: 'full-fit',
                },
            ]);
        });
        it('should not listen for farther file states', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Wait for observable unsubscription
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
                    case 1:
                        // Wait for observable unsubscription
                        _a.sent();
                        givenFileStateObservable.next({
                            status: 'error',
                            id: fileId,
                            occurrenceKey: 'some-occurrence-key',
                        });
                        component.update();
                        expect(component.find('ErrorView')).toHaveLength(0);
                        expect(component.find(EditorView)).toHaveLength(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('when EditorView calls onSave callback', function () {
        var resultingFileStateObservable;
        beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var touchedFiles, editorView, onSave;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, forFileToBeProcessed()];
                    case 1:
                        _a.sent();
                        resultingFileStateObservable = new ReplaySubject(1);
                        touchedFiles = {
                            created: [
                                {
                                    fileId: 'some-file-id',
                                    uploadId: 'some-upload-id',
                                },
                            ],
                        };
                        asMock(context.file.touchFiles).mockResolvedValue(touchedFiles);
                        asMock(context.file.upload).mockReturnValue(resultingFileStateObservable);
                        editorView = component.find(EditorView);
                        onSave = editorView.props().onSave;
                        onSave('some-image-content');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should upload a file', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var expectedUploadableFile, expectedUploadableFileUpfrontIds, actualUploadableFileUpfrontIds, actualUploadId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // First we touch files with client generated id
                        expectFunctionToHaveBeenCalledWith(context.file.touchFiles, [
                            [
                                {
                                    fileId: 'uuid1',
                                    collection: fileIdentifier.collectionName,
                                },
                            ],
                            fileIdentifier.collectionName,
                        ]);
                        expectedUploadableFile = {
                            content: 'some-image-content',
                            name: 'some-name',
                            collection: fileIdentifier.collectionName,
                        };
                        expectedUploadableFileUpfrontIds = {
                            id: 'uuid1',
                            deferredUploadId: expect.anything(),
                            occurrenceKey: 'some-occurrence-key',
                        };
                        expectFunctionToHaveBeenCalledWith(context.file.upload, [
                            expectedUploadableFile,
                            undefined,
                            expectedUploadableFileUpfrontIds,
                        ]);
                        actualUploadableFileUpfrontIds = asMock(context.file.upload).mock.calls[0][2];
                        return [4 /*yield*/, actualUploadableFileUpfrontIds.deferredUploadId];
                    case 1:
                        actualUploadId = _a.sent();
                        expectToEqual(actualUploadId, 'some-upload-id');
                        // In the end we exit synchronously with new identifier
                        expectFunctionToHaveBeenCalledWith(onUploadStart, [
                            {
                                mediaItemType: 'file',
                                id: 'uuid1',
                                collectionName: fileIdentifier.collectionName,
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should call onFinish when new file fully uploaded (processing)', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resultingFileStateObservable.next({
                            status: 'processing',
                            id: 'uuid1',
                            mediaType: 'image',
                            mimeType: 'image/gif',
                            name: 'some-name',
                            size: 42,
                        });
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
                    case 1:
                        _a.sent();
                        resultingFileStateObservable.next({
                            status: 'processing',
                            id: 'uuid1',
                            mediaType: 'image',
                            mimeType: 'image/gif',
                            name: 'some-name',
                            size: 42,
                        });
                        expect(onFinish).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should show error screen when processing-failed', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var errorViewProps;
            return tslib_1.__generator(this, function (_a) {
                asMock(formatMessage).mockReturnValue('Error message');
                resultingFileStateObservable.next({
                    status: 'failed-processing',
                    id: 'uuid1',
                    mediaType: 'image',
                    mimeType: 'image/gif',
                    name: 'some-name',
                    size: 42,
                    artifacts: [],
                });
                component.update();
                expect(component.find(EditorView)).toHaveLength(0);
                expect(component.find(ErrorView)).toHaveLength(1);
                errorViewProps = component.find(ErrorView).props();
                expectToEqual(errorViewProps.message, 'Error message');
                return [2 /*return*/];
            });
        }); });
        it('should show error screen when error', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var errorViewProps;
            return tslib_1.__generator(this, function (_a) {
                asMock(formatMessage).mockReturnValue('Error message');
                resultingFileStateObservable.next({
                    status: 'error',
                    id: 'uuid1',
                });
                component.update();
                expect(component.find(EditorView)).toHaveLength(0);
                expect(component.find(ErrorView)).toHaveLength(1);
                errorViewProps = component.find(ErrorView).props();
                expectToEqual(errorViewProps.message, 'Error message');
                return [2 /*return*/];
            });
        }); });
        it('should close editor when error is dismissed', function () {
            resultingFileStateObservable.next({
                status: 'failed-processing',
                id: 'uuid1',
                mediaType: 'image',
                mimeType: 'image/gif',
                name: 'some-name',
                size: 42,
                artifacts: [],
            });
            component.update();
            var errorViewProps = component.find(ErrorView).props();
            errorViewProps.onCancel();
            expect(onFinish).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=smartMediaEditorSpec.js.map