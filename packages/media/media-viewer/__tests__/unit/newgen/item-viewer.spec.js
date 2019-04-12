import * as tslib_1 from "tslib";
import { setViewerPayload, ImageViewer as ImageViewerMock, } from '../../mocks/_image-viewer';
var mockImageViewer = {
    ImageViewer: ImageViewerMock,
};
jest.mock('../../../newgen/viewers/image', function () { return mockImageViewer; });
import * as React from 'react';
import { Observable } from 'rxjs';
import Spinner from '@uidu/spinner';
import Button from '@uidu/button';
import { mountWithIntlContext } from '@uidu/media-test-helpers';
import { ItemViewer, ItemViewerBase, } from '../../../newgen/item-viewer';
import { ErrorMessage } from '../../../newgen/error';
import { ImageViewer } from '../../../newgen/viewers/image';
import { VideoViewer } from '../../../newgen/viewers/video';
import { AudioViewer } from '../../../newgen/viewers/audio';
import { DocViewer } from '../../../newgen/viewers/doc';
import { name as packageName, version as packageVersion, } from '../../../../package.json';
var identifier = {
    id: 'some-id',
    occurrenceKey: 'some-custom-occurrence-key',
    mediaItemType: 'file',
    collectionName: 'some-collection',
};
var makeFakeContext = function (observable) {
    return ({
        file: {
            getFileState: jest.fn(function () { return observable; }),
        },
    });
};
function mountComponent(context, identifier) {
    var el = mountWithIntlContext(React.createElement(ItemViewer, { previewCount: 0, context: context, identifier: identifier }));
    var instance = el.find(ItemViewerBase).instance();
    return { el: el, instance: instance };
}
function mountBaseComponent(context, identifier) {
    var createAnalyticsEventSpy = jest.fn();
    createAnalyticsEventSpy.mockReturnValue({ fire: jest.fn() });
    var el = mountWithIntlContext(React.createElement(ItemViewerBase, { createAnalyticsEvent: createAnalyticsEventSpy, previewCount: 0, context: context, identifier: identifier }));
    var instance = el.instance();
    return { el: el, instance: instance, createAnalyticsEventSpy: createAnalyticsEventSpy };
}
describe('<ItemViewer />', function () {
    beforeEach(function () {
        setViewerPayload({ status: 'success' });
    });
    it('shows an indicator while loading', function () {
        var context = makeFakeContext(Observable.empty());
        var el = mountComponent(context, identifier).el;
        expect(el.find(Spinner)).toHaveLength(1);
    });
    it('shows a generic error on unkown error', function () {
        var context = makeFakeContext(Observable.throw('something bad happened!'));
        var el = mountComponent(context, identifier).el;
        el.update();
        var errorMessage = el.find(ErrorMessage);
        expect(errorMessage).toHaveLength(1);
        expect(errorMessage.text()).toContain('Something went wrong');
        expect(errorMessage.find(Button)).toHaveLength(0);
    });
    it('should show the image viewer if media type is image', function () {
        var context = makeFakeContext(Observable.of({
            id: identifier.id,
            mediaType: 'image',
            status: 'processed',
        }));
        var el = mountComponent(context, identifier).el;
        el.update();
        expect(el.find(ImageViewer)).toHaveLength(1);
        // MSW:720 - passes the collectionName along
        expect(el.find(ImageViewer).prop('collectionName')).toEqual(identifier.collectionName);
    });
    it('should should error and download button if processing Status failed', function () {
        var context = makeFakeContext(Observable.of({ status: 'error' }));
        var el = mountComponent(context, identifier).el;
        el.update();
        var errorMessage = el.find(ErrorMessage);
        expect(errorMessage).toHaveLength(1);
        expect(errorMessage.text()).toContain("We couldn't generate a preview for this file.Try downloading the file to view it.Download");
        expect(errorMessage.find(Button)).toHaveLength(1);
    });
    it('should should error and download button if file is processing failed', function () {
        var context = makeFakeContext(Observable.of({
            id: '123',
            mediaType: 'video',
            status: 'failed-processing',
        }));
        var el = mountWithIntlContext(React.createElement(ItemViewer, { previewCount: 0, context: context, identifier: identifier }));
        el.update();
        var errorMessage = el.find(ErrorMessage);
        expect(errorMessage).toHaveLength(1);
        expect(errorMessage.text()).toContain("We couldn't generate a preview for this file.Try downloading the file to view it.Download");
        expect(errorMessage.find(Button)).toHaveLength(1);
    });
    it('should should error and download button if file is in error state', function () {
        var context = makeFakeContext(Observable.of({
            id: '123',
            mediaType: 'image',
            status: 'error',
        }));
        var el = mountWithIntlContext(React.createElement(ItemViewer, { previewCount: 0, context: context, identifier: identifier }));
        el.update();
        var errorMessage = el.find(ErrorMessage);
        expect(errorMessage).toHaveLength(1);
        expect(errorMessage.text()).toContain("We couldn't generate a preview for this file.Try downloading the file to view it.Download");
        expect(errorMessage.find(Button)).toHaveLength(1);
    });
    it('should show the video viewer if media type is video', function () {
        var state = {
            id: identifier.id,
            mediaType: 'video',
            status: 'processed',
            mimeType: '',
            name: '',
            size: 1,
            artifacts: {},
        };
        var context = makeFakeContext(Observable.of(state));
        var el = mountComponent(context, identifier).el;
        el.update();
        expect(el.find(VideoViewer)).toHaveLength(1);
        // MSW:720 - passes the collectionName along
        expect(el.find(VideoViewer).prop('collectionName')).toEqual(identifier.collectionName);
    });
    it('should show the audio viewer if media type is audio', function () {
        var context = makeFakeContext(Observable.of({
            id: identifier.id,
            mediaType: 'audio',
            status: 'processed',
        }));
        var el = mountComponent(context, identifier).el;
        el.update();
        expect(el.find(AudioViewer)).toHaveLength(1);
        // MSW:720 - passes the collectionName along
        expect(el.find(AudioViewer).prop('collectionName')).toEqual(identifier.collectionName);
    });
    it('should show the document viewer if media type is document', function () {
        var context = makeFakeContext(Observable.of({
            id: identifier.id,
            mediaType: 'doc',
            status: 'processed',
        }));
        var el = mountComponent(context, identifier).el;
        el.update();
        expect(el.find(DocViewer)).toHaveLength(1);
        // MSW:720 - passes the collectionName along
        expect(el.find(DocViewer).prop('collectionName')).toEqual(identifier.collectionName);
    });
    it('should should error and download button if file is unsupported', function () {
        var context = makeFakeContext(Observable.of({
            id: identifier.id,
            mediaType: 'unknown',
            status: 'processed',
        }));
        var el = mountComponent(context, identifier).el;
        el.update();
        var errorMessage = el.find(ErrorMessage);
        expect(errorMessage).toHaveLength(1);
        expect(errorMessage.text()).toContain("We can't preview this file type.Try downloading the file to view it.Download");
        expect(errorMessage.find(Button)).toHaveLength(1);
    });
    it('MSW-720: passes the collectionName to getFileState', function () {
        var context = makeFakeContext(Observable.of({
            id: identifier.id,
            mediaType: 'image',
            status: 'processed',
        }));
        var el = mountComponent(context, identifier).el;
        el.update();
        expect(context.file.getFileState).toHaveBeenCalledWith('some-id', {
            collectionName: 'some-collection',
        });
    });
    describe('Subscription', function () {
        it('unsubscribes from the provider when unmounted', function () {
            var release = jest.fn();
            var context = makeFakeContext(Observable.of({
                id: '123',
                mediaType: 'unknown',
                status: 'processed',
            }));
            var _a = mountComponent(context, identifier), el = _a.el, instance = _a.instance;
            instance.release = release;
            expect(instance.release).toHaveBeenCalledTimes(0);
            el.unmount();
            expect(instance.release).toHaveBeenCalledTimes(1);
        });
        it('resubscribes to the provider when the data property value is changed', function () {
            var identifierCopy = tslib_1.__assign({}, identifier);
            var context = makeFakeContext(Observable.of({
                id: '123',
                mediaType: 'unknown',
                status: 'processed',
            }));
            var el = mountComponent(context, identifier).el;
            expect(context.file.getFileState).toHaveBeenCalledTimes(1);
            // if the values stay the same, we will not resubscribe
            el.setProps({ context: context, identifier: identifierCopy });
            expect(context.file.getFileState).toHaveBeenCalledTimes(1);
            // ... but if the identifier change we will resubscribe
            var identifier2 = tslib_1.__assign({}, identifier, { id: 'some-other-id' });
            el.setProps({ context: context, identifier: identifier2 });
            expect(context.file.getFileState).toHaveBeenCalledTimes(2);
            // if the context changes, we will also resubscribe
            var newContext = makeFakeContext(Observable.of({
                id: '123',
                mediaType: 'unknown',
                status: 'processed',
            }));
            el.setProps({ context: newContext, identifier: identifier2 });
            expect(context.file.getFileState).toHaveBeenCalledTimes(2);
            expect(newContext.file.getFileState).toHaveBeenCalledTimes(1);
        });
        it('should return to PENDING state when resets', function () {
            var context = makeFakeContext(Observable.of({
                id: '123',
                mediaType: 'unknown',
                status: 'processed',
            }));
            var _a = mountBaseComponent(context, identifier), el = _a.el, instance = _a.instance;
            expect(instance.state.item.status).toEqual('SUCCESSFUL');
            var identifier2 = tslib_1.__assign({}, identifier, { id: 'some-other-id' });
            // since the test is executed synchronously
            // let's prevent the second call to getFile from immediately resolving and
            // updating the state to SUCCESSFUL before we run the assertion.
            context.file.getFileState = function () { return Observable.never(); };
            el.setProps({ context: context, identifier: identifier2 });
            el.update();
            expect(instance.state.item.status).toEqual('PENDING');
        });
    });
    describe('Analytics', function () {
        var analyticsBaseAttributes = {
            componentName: 'media-viewer',
            packageName: packageName,
            packageVersion: packageVersion,
        };
        it('should trigger analytics when the preview commences', function () {
            var context = makeFakeContext(Observable.of({
                id: identifier.id,
                mediaType: 'unknown',
                status: 'processed',
            }));
            var createAnalyticsEventSpy = mountBaseComponent(context, identifier).createAnalyticsEventSpy;
            expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
                action: 'commenced',
                actionSubject: 'mediaFile',
                actionSubjectId: 'some-id',
                attributes: tslib_1.__assign({ fileId: 'some-id' }, analyticsBaseAttributes),
                eventType: 'operational',
            });
        });
        it('should trigger analytics when metadata fetching ended with an error', function () {
            var context = makeFakeContext(Observable.throw('something bad happened!'));
            var createAnalyticsEventSpy = mountBaseComponent(context, identifier).createAnalyticsEventSpy;
            expect(createAnalyticsEventSpy).toHaveBeenCalledTimes(2);
            expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
                action: 'commenced',
                actionSubject: 'mediaFile',
                actionSubjectId: 'some-id',
                attributes: tslib_1.__assign({ fileId: 'some-id' }, analyticsBaseAttributes),
                eventType: 'operational',
            });
            expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
                action: 'loadFailed',
                actionSubject: 'mediaFile',
                actionSubjectId: 'some-id',
                attributes: tslib_1.__assign({ failReason: 'Metadata fetching failed', fileId: 'some-id', status: 'fail' }, analyticsBaseAttributes),
                eventType: 'operational',
            });
        });
        it('should trigger analytics when viewer returned an error', function () {
            setViewerPayload({
                status: 'error',
                errorMessage: 'Image viewer failed :(',
            });
            var context = makeFakeContext(Observable.of({
                id: identifier.id,
                mediaType: 'image',
                status: 'processed',
            }));
            var createAnalyticsEventSpy = mountBaseComponent(context, identifier).createAnalyticsEventSpy;
            expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
                action: 'loadFailed',
                actionSubject: 'mediaFile',
                actionSubjectId: 'some-id',
                attributes: tslib_1.__assign({ failReason: 'Image viewer failed :(', fileId: 'some-id', fileMediatype: 'image', fileSize: undefined, status: 'fail' }, analyticsBaseAttributes),
                eventType: 'operational',
            });
        });
        it('should trigger analytics when viewer is successful', function () {
            var context = makeFakeContext(Observable.of({
                id: identifier.id,
                mediaType: 'image',
                status: 'processed',
            }));
            var createAnalyticsEventSpy = mountBaseComponent(context, identifier).createAnalyticsEventSpy;
            expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
                action: 'loadSucceeded',
                actionSubject: 'mediaFile',
                actionSubjectId: 'some-id',
                attributes: tslib_1.__assign({ fileId: 'some-id', fileMediatype: 'image', fileSize: undefined, status: 'success' }, analyticsBaseAttributes),
                eventType: 'operational',
            });
        });
    });
});
//# sourceMappingURL=item-viewer.spec.js.map