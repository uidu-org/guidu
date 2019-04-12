import * as React from 'react';
import { mount } from 'enzyme';
import { Navigation, NavigationBase } from '../../../newgen/navigation';
import ArrowLeftCircleIcon from '@atlaskit/icon/glyph/chevron-left-circle';
import ArrowRightCircleIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import { KeyboardEventWithKeyCode } from '@uidu/media-test-helpers';
/**
 * Skipped two tests in here that are failing due to an issue with synthetic keyboard events
 * TODO: JEST-23 Fix these tests
 */
describe('Navigation', function () {
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
    var identifier2Duplicated = {
        id: 'some-id-2',
        occurrenceKey: 'some-other-occurrence-key',
        mediaItemType: 'file',
    };
    var identifier3 = {
        id: 'some-id-3',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
    };
    var nonFoundIdentifier = {
        id: 'some-other-id',
        occurrenceKey: 'some-custom-occurrence-key',
        mediaItemType: 'file',
    };
    var items = [identifier, identifier2, identifier3, identifier2Duplicated];
    function mountBaseComponent() {
        var createAnalyticsEventSpy = jest.fn();
        createAnalyticsEventSpy.mockReturnValue({ fire: jest.fn() });
        var el = mount(React.createElement(NavigationBase, { createAnalyticsEvent: createAnalyticsEventSpy, items: [identifier, identifier2, identifier3], selectedItem: identifier2, onChange: function () { } }));
        return { el: el, createAnalyticsEventSpy: createAnalyticsEventSpy };
    }
    it('should show right arrow if there are items on the right', function () {
        var el = mount(React.createElement(Navigation, { onChange: function () { }, items: items, selectedItem: identifier }));
        expect(el.find(ArrowRightCircleIcon)).toHaveLength(1);
    });
    it('should show left arrow if there are items on the left', function () {
        var el = mount(React.createElement(Navigation, { onChange: function () { }, items: items, selectedItem: identifier3 }));
        expect(el.find(ArrowLeftCircleIcon)).toHaveLength(1);
    });
    it('should not show arrows if there is only one item', function () {
        var el = mount(React.createElement(Navigation, { onChange: function () { }, items: [identifier], selectedItem: identifier }));
        expect(el.find(ArrowLeftCircleIcon)).toHaveLength(0);
        expect(el.find(ArrowRightCircleIcon)).toHaveLength(0);
    });
    it('should handle items with the same id', function () {
        var el = mount(React.createElement(Navigation, { onChange: function () { }, items: items, selectedItem: identifier2Duplicated }));
        expect(el.find(ArrowLeftCircleIcon)).toHaveLength(1);
        expect(el.find(ArrowRightCircleIcon)).toHaveLength(0);
    });
    it('should show both arrows if there are items in both sides', function () {
        var el = mount(React.createElement(Navigation, { onChange: function () { }, items: items, selectedItem: identifier2 }));
        expect(el.find(ArrowLeftCircleIcon)).toHaveLength(1);
        expect(el.find(ArrowRightCircleIcon)).toHaveLength(1);
    });
    it('should call onChange callback when left arrow is clicked', function () {
        var onChange = jest.fn();
        var el = mount(React.createElement(Navigation, { onChange: onChange, items: items, selectedItem: identifier2 }));
        el.find(ArrowLeftCircleIcon)
            .first()
            .simulate('click');
        expect(onChange).toBeCalledWith(identifier);
    });
    it('should call onChange callback when right arrow is clicked', function () {
        var onChange = jest.fn();
        var el = mount(React.createElement(Navigation, { onChange: onChange, items: items, selectedItem: identifier }));
        el.find(ArrowRightCircleIcon)
            .first()
            .simulate('click');
        expect(onChange).toBeCalledWith(identifier2);
    });
    it('should not show any arrows if selectedItem is not found', function () {
        var onChange = jest.fn();
        var el = mount(React.createElement(Navigation, { onChange: onChange, items: items, selectedItem: nonFoundIdentifier }));
        expect(el.find(ArrowRightCircleIcon)).toHaveLength(0);
        expect(el.find(ArrowLeftCircleIcon)).toHaveLength(0);
    });
    describe('Shortcuts', function () {
        it.skip('should call onChange callback when left ARROW key is pressed', function () {
            var onChange = jest.fn();
            mount(React.createElement(Navigation, { onChange: onChange, items: items, selectedItem: identifier2 }));
            var e = new KeyboardEventWithKeyCode('keydown', {
                bubbles: true,
                cancelable: true,
                keyCode: 37,
            });
            document.dispatchEvent(e);
            expect(onChange).toBeCalledWith(identifier);
        });
        it.skip('should call onChange callback when right ARROW key is pressed', function () {
            var onChange = jest.fn();
            mount(React.createElement(Navigation, { onChange: onChange, items: items, selectedItem: identifier }));
            var e = new KeyboardEventWithKeyCode('keydown', {
                bubbles: true,
                cancelable: true,
                keyCode: 39,
            });
            document.dispatchEvent(e);
            expect(onChange).toBeCalledWith(identifier2);
        });
    });
    describe('Analytics', function () {
        it('should fire analytics on right arrow click', function () {
            var _a = mountBaseComponent(), el = _a.el, createAnalyticsEventSpy = _a.createAnalyticsEventSpy;
            el.find(ArrowRightCircleIcon)
                .first()
                .simulate('click');
            expect(createAnalyticsEventSpy).toHaveBeenCalled();
        });
        it('should fire analytics on left arrow click', function () {
            var _a = mountBaseComponent(), el = _a.el, createAnalyticsEventSpy = _a.createAnalyticsEventSpy;
            el.find(ArrowLeftCircleIcon)
                .first()
                .simulate('click');
            expect(createAnalyticsEventSpy).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=navigation.spec.js.map