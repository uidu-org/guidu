import * as tslib_1 from "tslib";
var mediaViewerModule = require.requireActual('../../../newgen/analytics/media-viewer');
var mediaViewerModalEventSpy = jest.fn();
var mockMediaViewer = tslib_1.__assign({}, mediaViewerModule, { mediaViewerModalEvent: mediaViewerModalEventSpy });
jest.mock('../../../newgen/analytics/media-viewer', function () { return mockMediaViewer; });
import * as React from 'react';
import { mount } from 'enzyme';
import { Subject } from 'rxjs/Subject';
import Button from '@uidu/button';
import { KeyboardEventWithKeyCode } from '@uidu/media-test-helpers';
import { createContext } from '../_stubs';
import { Content } from '../../../newgen/content';
import { MediaViewer } from '../../../newgen/media-viewer';
import { CloseButtonWrapper } from '../../../newgen/styled';
import { ErrorMessage } from '../../../newgen/error';
import Header from '../../../newgen/header';
function createFixture(items, identifier) {
    var subject = new Subject();
    var context = createContext();
    var onClose = jest.fn();
    var itemSource = {
        kind: 'ARRAY',
        items: items,
    };
    var el = mount(React.createElement(MediaViewer, { selectedItem: identifier, itemSource: itemSource, context: context, onClose: onClose }));
    return { subject: subject, el: el, onClose: onClose };
}
describe('<MediaViewer />', function () {
    var identifier = {
        id: 'some-id',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
    };
    it('should display an error if data source is not supported', function () {
        var el = createFixture([], identifier).el;
        expect(el.find(ErrorMessage)).toHaveLength(1);
    });
    it('should close Media Viewer on click', function () {
        var _a = createFixture([identifier], identifier), el = _a.el, onClose = _a.onClose;
        el.find(Content).simulate('click');
        expect(onClose).toHaveBeenCalled();
    });
    it.skip('should close Media Viewer on ESC shortcut', function () {
        var onClose = createFixture([identifier], identifier).onClose;
        var e = new KeyboardEventWithKeyCode('keydown', {
            bubbles: true,
            cancelable: true,
            keyCode: 27,
        });
        document.dispatchEvent(e);
        expect(onClose).toHaveBeenCalled();
    });
    it('should not close Media Viewer when clicking on the Header', function () {
        var _a = createFixture([identifier], identifier), el = _a.el, onClose = _a.onClose;
        el.find(Header).simulate('click');
        expect(onClose).not.toHaveBeenCalled();
    });
    it('the error view show close on click', function () {
        var selectedItem = {
            id: 'some-id-2',
            occurrenceKey: 'some-custom-occurrence-key',
            mediaItemType: 'file',
        };
        var _a = createFixture([], selectedItem), el = _a.el, onClose = _a.onClose;
        expect(el.find(ErrorMessage)).toHaveLength(1);
        el.find(Content).simulate('click');
        expect(onClose).toHaveBeenCalled();
    });
    it('should always render the close button', function () {
        var _a = createFixture([identifier], identifier), el = _a.el, onClose = _a.onClose;
        expect(el.find(CloseButtonWrapper)).toHaveLength(1);
        el.find(CloseButtonWrapper)
            .find(Button)
            .simulate('click');
        expect(onClose).toHaveBeenCalled();
    });
    describe('Analytics', function () {
        it('should trigger the screen event when the component loads', function () {
            createFixture([identifier], identifier);
            expect(mediaViewerModalEventSpy).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=media-viewer.js.map