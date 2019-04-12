import * as tslib_1 from "tslib";
import { mount } from 'enzyme';
import { createItemDownloader, ToolbarDownloadButton, ErrorViewDownloadButton, DownloadButton, } from '../../../newgen/download';
import { createContext } from '../_stubs';
import * as React from 'react';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { MediaViewerError } from '../../../newgen/error';
import { name as packageName, version as packageVersion, } from '../../../../package.json';
describe('download', function () {
    var processingFailedState = {
        status: 'failed-processing',
        id: 'some-id',
        name: 'some-name',
        size: 42,
        artifacts: {},
        mediaType: 'image',
        mimeType: 'some-mime-type',
    };
    var errorState = {
        status: 'error',
        id: 'some-id',
    };
    describe('createItemDownloader', function () {
        it('should take name from file provided', function () {
            var context = createContext({});
            createItemDownloader(processingFailedState, context)();
            expect(context.file.downloadBinary).toHaveBeenCalledWith('some-id', 'some-name', undefined);
        });
        it('should not try to take name from errored file provided', function () {
            var context = createContext({});
            createItemDownloader(errorState, context)();
            expect(context.file.downloadBinary).toHaveBeenCalledWith('some-id', undefined, undefined);
        });
        it('should pass collection name', function () {
            var context = createContext({});
            createItemDownloader(processingFailedState, context, 'some-collection-name')();
            expect(context.file.downloadBinary).toHaveBeenCalledWith('some-id', 'some-name', 'some-collection-name');
        });
    });
    describe('ErrorViewDownloadButton', function () {
        it('should trigger an analytics event in the media channel', function () {
            var context = createContext({});
            var spy = jest.fn();
            var err = new MediaViewerError('metadataFailed');
            var component = mount(React.createElement(AnalyticsListener, { channel: "media", onEvent: spy },
                React.createElement(ErrorViewDownloadButton, { state: processingFailedState, err: err, context: context })));
            component.find(DownloadButton).simulate('click');
            var _a = tslib_1.__read(spy.mock.calls, 1), _b = tslib_1.__read(_a[0], 1), payload = _b[0].payload;
            expect(spy).toHaveBeenCalledTimes(1);
            expect(payload).toEqual({
                action: 'clicked',
                actionSubject: 'button',
                actionSubjectId: 'failedPreviewDownloadButton',
                attributes: {
                    componentName: 'media-viewer',
                    fileId: 'some-id',
                    failReason: 'metadataFailed',
                    fileMediatype: 'image',
                    fileMimetype: 'some-mime-type',
                    fileProcessingStatus: 'failed-processing',
                    fileSize: 42,
                    fileSupported: true,
                    packageName: packageName,
                    packageVersion: packageVersion,
                },
                eventType: 'ui',
            });
        });
    });
    describe('ToolbarDownloadButton', function () {
        it('should download binary when toolbar button is clicked', function () {
            var context = createContext({});
            var component = mount(React.createElement(ToolbarDownloadButton, { state: processingFailedState, identifier: {
                    id: 'my-id',
                    mediaItemType: 'file',
                    occurrenceKey: 'my-occurrenceKey',
                    collectionName: 'some-collection-name',
                }, context: context }));
            component.find(DownloadButton).simulate('click');
            expect(context.file.downloadBinary).toHaveBeenCalledWith('some-id', 'some-name', 'some-collection-name');
        });
    });
    it('should trigger an analytics event in the media channel', function () {
        var context = createContext({});
        var spy = jest.fn();
        var component = mount(React.createElement(AnalyticsListener, { channel: "media", onEvent: spy },
            React.createElement(ToolbarDownloadButton, { state: processingFailedState, identifier: {
                    id: 'my-id',
                    mediaItemType: 'file',
                    occurrenceKey: 'my-occurrenceKey',
                    collectionName: 'some-collection-name',
                }, context: context })));
        component.find(DownloadButton).simulate('click');
        var _a = tslib_1.__read(spy.mock.calls, 1), _b = tslib_1.__read(_a[0], 1), payload = _b[0].payload;
        expect(spy).toHaveBeenCalledTimes(1);
        expect(payload).toEqual({
            action: 'clicked',
            actionSubject: 'button',
            actionSubjectId: 'downloadButton',
            attributes: {
                componentName: 'media-viewer',
                fileId: 'some-id',
                fileMediatype: 'image',
                fileMimetype: 'some-mime-type',
                fileProcessingStatus: 'failed-processing',
                fileSize: 42,
                fileSupported: true,
                packageName: packageName,
                packageVersion: packageVersion,
            },
            eventType: 'ui',
        });
    });
});
//# sourceMappingURL=download.spec.js.map