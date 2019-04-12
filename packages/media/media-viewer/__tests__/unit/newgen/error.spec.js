import * as tslib_1 from "tslib";
var itemViewerModule = require.requireActual('../../../newgen/analytics/item-viewer');
var mediaPreviewFailedEventSpy = jest.fn();
var mockItemViewer = tslib_1.__assign({}, itemViewerModule, { mediaPreviewFailedEvent: mediaPreviewFailedEventSpy });
jest.mock('../../../newgen/analytics/item-viewer', function () { return mockItemViewer; });
import * as React from 'react';
import { mount } from 'enzyme';
import { ErrorMessage, createError } from '../../../newgen/error';
import Button from '@uidu/button';
import { fakeIntl } from '@uidu/media-test-helpers';
describe('Error Message', function () {
    it('should render the right error for retrieving metadata', function () {
        var el = mount(React.createElement(ErrorMessage, { intl: fakeIntl, error: createError('metadataFailed') }));
        expect(el.text()).toContain('Something went wrong.It might just be a hiccup.');
    });
    it('should render the right error for generating a preview', function () {
        var el = mount(React.createElement(ErrorMessage, { intl: fakeIntl, error: createError('previewFailed') }));
        expect(el.text()).toContain("We couldn't generate a preview for this file");
    });
    it('should render the right error when the id is not found', function () {
        var el = mount(React.createElement(ErrorMessage, { intl: fakeIntl, error: createError('idNotFound') }));
        expect(el.text()).toContain('The selected item was not found on the list');
    });
    it('should render the right error when the PDF artifact does not exist', function () {
        var el = mount(React.createElement(ErrorMessage, { intl: fakeIntl, error: createError('noPDFArtifactsFound') }));
        expect(el.text()).toContain('No PDF artifacts found for this file');
    });
    it('should render the right error when the file type is unsupported', function () {
        var el = mount(React.createElement(ErrorMessage, { intl: fakeIntl, error: createError('unsupported') }));
        expect(el.text()).toContain("We can't preview this file type.");
    });
    it('should render a child component', function () {
        var el = mount(React.createElement(ErrorMessage, { intl: fakeIntl, error: createError('unsupported') },
            React.createElement(Button, null)));
        expect(el.find(Button)).toHaveLength(1);
    });
    it('should trigger analytics when displayed', function () {
        mount(React.createElement(ErrorMessage, { intl: fakeIntl, error: createError('unsupported') },
            React.createElement(Button, null)));
        expect(mediaPreviewFailedEventSpy).toHaveBeenCalledWith('unsupported', undefined);
    });
});
//# sourceMappingURL=error.spec.js.map