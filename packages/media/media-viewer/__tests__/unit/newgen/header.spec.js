import * as tslib_1 from "tslib";
import * as util from '../../../newgen/utils';
var constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');
import * as React from 'react';
import { Observable } from 'rxjs';
import { mount } from 'enzyme';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { fakeIntl } from '@uidu/media-test-helpers';
import { createContext } from '../_stubs';
import { Header } from '../../../newgen/header';
import { MetadataFileName, MetadataSubText } from '../../../newgen/styled';
import { LeftHeader } from '../../../newgen/styled';
var identifier = {
    id: 'some-id',
    occurrenceKey: 'some-custom-occurrence-key',
    mediaItemType: 'file',
};
var identifier2 = {
    id: 'some-id-2',
    occurrenceKey: 'some-custom-occurrence-key',
    mediaItemType: 'file',
};
var processedImageState = {
    id: '123',
    mediaType: 'image',
    mimeType: 'jpeg',
    status: 'processed',
    name: 'my image',
    size: 0,
    artifacts: {},
};
describe('<Header />', function () {
    afterEach(function () {
        constructAuthTokenUrlSpy.mockClear();
    });
    it('shows an empty header while loading', function () {
        var context = createContext({
            getFileState: function () { return Observable.empty(); },
        });
        var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
        var metadata = el.find(LeftHeader);
        expect(metadata.text()).toEqual('');
    });
    it('resubscribes to the provider when the data property value is changed', function () {
        var context = createContext({
            getFileState: function () { return Observable.of(processedImageState); },
        });
        var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
        el.update();
        expect(el.find(MetadataFileName).text()).toEqual('my image');
        expect(context.file.getFileState).toHaveBeenCalledTimes(1);
        el.setProps({ identifier: identifier2 });
        expect(context.file.getFileState).toHaveBeenCalledTimes(2);
    });
    it('component resets initial state when new identifier is passed', function () {
        var context = createContext({
            getFileState: function () { return Observable.of(processedImageState); },
        });
        var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
        expect(el.state().item.status).toEqual('SUCCESSFUL');
        // since the test is executed synchronously
        // let's prevent the second call to getFile from immediately resolving and
        // updating the state to SUCCESSFUL before we run the assertion.
        context.file.getFileState = function () { return Observable.never(); };
        el.setProps({ identifier: identifier2 });
        expect(el.state().item.status).toEqual('PENDING');
    });
    it('component resets initial state when new context is passed', function () {
        var context = createContext({
            getFileState: function () { return Observable.of(processedImageState); },
        });
        var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
        expect(el.state().item.status).toEqual('SUCCESSFUL');
        // since the test is executed synchronously
        // let's prevent the second call to getFile from immediately resolving and
        // updating the state to SUCCESSFUL before we run the assertion.
        var newContext = createContext({
            getFileState: function () { return Observable.never(); },
        });
        el.setProps({ context: newContext });
        expect(el.state().item.status).toEqual('PENDING');
    });
    describe('Metadata', function () {
        describe('File collectionName', function () {
            it('shows the title when loaded', function () {
                var context = createContext({
                    getFileState: function () { return Observable.of(processedImageState); },
                });
                var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
                el.update();
                expect(el.find(MetadataFileName).text()).toEqual('my image');
            });
            it('shows unknown if file collectionName not provided on metadata', function () {
                var unNamedImage = tslib_1.__assign({}, processedImageState, { name: '' });
                var context = createContext({
                    getFileState: function () { return Observable.of(unNamedImage); },
                });
                var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
                el.update();
                expect(el.find(MetadataFileName).text()).toEqual('unknown');
            });
        });
        describe('File metadata', function () {
            var testMediaTypeText = function (mediaType, expectedText) {
                var testItem = {
                    id: '123',
                    mediaType: mediaType,
                    mimeType: 'jpeg',
                    status: 'processed',
                    name: 'my item',
                    size: 12222222,
                    artifacts: {},
                };
                var context = createContext({
                    getFileState: function () { return Observable.of(testItem); },
                });
                var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
                el.update();
                expect(el.find(MetadataSubText).text()).toEqual(expectedText + " \u00B7 11.7 MB");
            };
            it('should render media type text and file size for each media type', function () {
                testMediaTypeText('image', 'image');
                testMediaTypeText('audio', 'audio');
                testMediaTypeText('video', 'video');
                testMediaTypeText('unknown', 'unknown');
                testMediaTypeText('doc', 'document');
            });
            it('should not render file size if unavailable', function () {
                var noSizeImage = tslib_1.__assign({}, processedImageState, { size: 0 });
                var context = createContext({
                    getFileState: function () { return Observable.of(noSizeImage); },
                });
                var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
                el.update();
                expect(el.find(MetadataSubText).text()).toEqual('image');
            });
            it('should not render media type if unavailable', function () {
                var noMediaTypeElement = tslib_1.__assign({}, processedImageState, { mediaType: '', size: 23232323 });
                var context = createContext({
                    getFileState: function () { return Observable.of(noMediaTypeElement); },
                });
                var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
                el.update();
                expect(el.find(MetadataSubText).text()).toEqual('unknown · 22.2 MB');
            });
        });
        it('shows nothing when metadata failed to be retrieved', function () {
            var context = createContext({
                getFileState: function () { return Observable.throw('something bad happened!'); },
            });
            var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
            var metadata = el.find(LeftHeader);
            expect(metadata.text()).toEqual('');
        });
        it('MSW-720: passes the collectionName to getFile', function () {
            var collectionName = 'some-collection';
            var context = createContext({
                getFileState: function () { return Observable.of(processedImageState); },
            });
            var identifierWithCollection = tslib_1.__assign({}, identifier, { collectionName: collectionName });
            var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifierWithCollection }));
            el.update();
            expect(context.file.getFileState).toHaveBeenCalledWith('some-id', {
                collectionName: 'some-collection',
            });
        });
        it('MSW-720: passes the collectionName to context.file.downloadBinary', function () {
            var collectionName = 'some-collection';
            var context = createContext({
                getFileState: function () { return Observable.of(processedImageState); },
            });
            var identifierWithCollection = tslib_1.__assign({}, identifier, { collectionName: collectionName });
            var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifierWithCollection }));
            el.update();
            el.find(DownloadIcon).simulate('click');
            expect(context.file.downloadBinary.mock.calls[0][2]).toEqual(collectionName);
        });
    });
    describe('Download button', function () {
        var assertDownloadButton = function (el, enabled) {
            expect(el.find({ type: 'button', isDisabled: !enabled })).toHaveLength(1);
            expect(el.find(DownloadIcon)).toHaveLength(1);
        };
        it('should show the download button disabled while the item metadata is loading', function () {
            var context = createContext({
                getFileState: function () { return Observable.empty(); },
            });
            var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
            el.update();
            assertDownloadButton(el, false);
        });
        it('should show the download button enabled when the item is loaded', function () {
            var context = createContext({
                getFileState: function () { return Observable.of(processedImageState); },
            });
            var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
            el.update();
            assertDownloadButton(el, true);
        });
        it('should show the download button disabled when there is an error', function () {
            var context = createContext({
                getFileState: function () { return Observable.throw('something bad happened!'); },
            });
            var el = mount(React.createElement(Header, { intl: fakeIntl, context: context, identifier: identifier }));
            el.update();
            assertDownloadButton(el, false);
        });
    });
});
//# sourceMappingURL=header.spec.js.map