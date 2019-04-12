import * as tslib_1 from "tslib";
import * as React from 'react';
import { mount } from 'enzyme';
import Button from '@uidu/button';
import { ZoomControlsBase, } from '../../../newgen/zoomControls';
import { ZoomLevelIndicator } from '../../../newgen/styled';
import { ZoomLevel } from '../../../newgen/domain/zoomLevel';
import { name as packageName, version as packageVersion, } from '../../../../package.json';
import { fakeIntl } from '@uidu/media-test-helpers';
describe('Zooming', function () {
    describe('<ZoomControls />', function () {
        var setupBase = function (props) {
            var onChange = jest.fn();
            var createAnalyticsEventSpy = jest.fn();
            createAnalyticsEventSpy.mockReturnValue({ fire: jest.fn() });
            var component = mount(React.createElement(ZoomControlsBase, tslib_1.__assign({ createAnalyticsEvent: createAnalyticsEventSpy, zoomLevel: new ZoomLevel(1), onChange: onChange, intl: fakeIntl }, props)));
            return {
                onChange: onChange,
                component: component,
                createAnalyticsEventSpy: createAnalyticsEventSpy,
            };
        };
        it('should increase and decrease zoom', function () {
            var _a = setupBase(), component = _a.component, onChange = _a.onChange;
            var zoomLevel = new ZoomLevel(1);
            component
                .find(Button)
                .first()
                .simulate('click');
            expect(onChange).lastCalledWith(zoomLevel.zoomOut());
            component
                .find(Button)
                .last()
                .simulate('click');
            expect(onChange).lastCalledWith(zoomLevel.zoomIn());
        });
        it('should not allow zooming above upper limit', function () {
            var _a = setupBase({
                zoomLevel: new ZoomLevel(1).fullyZoomIn(),
            }), component = _a.component, onChange = _a.onChange;
            component
                .find(Button)
                .last()
                .simulate('click');
            expect(onChange).not.toBeCalled();
        });
        it('should not allow zooming below lower limit', function () {
            var _a = setupBase({
                zoomLevel: new ZoomLevel(1).fullyZoomOut(),
            }), component = _a.component, onChange = _a.onChange;
            component
                .find(Button)
                .first()
                .simulate('click');
            expect(onChange).not.toBeCalled();
        });
        describe('zoom level indicator', function () {
            it('shows 100% zoom level', function () {
                var component = setupBase().component;
                expect(component.find(ZoomLevelIndicator).text()).toEqual('100 %');
            });
        });
        describe('analytics', function () {
            var analyticsBaseAttributes = {
                componentName: 'media-viewer',
                packageName: packageName,
                packageVersion: packageVersion,
            };
            it('triggers analytics events on zoom Out', function () {
                var _a = setupBase(), component = _a.component, createAnalyticsEventSpy = _a.createAnalyticsEventSpy;
                component
                    .find(Button)
                    .first()
                    .simulate('click');
                expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
                    eventType: 'ui',
                    action: 'clicked',
                    actionSubject: 'button',
                    actionSubjectId: 'zoomOut',
                    attributes: tslib_1.__assign({ zoomScale: 0.48 }, analyticsBaseAttributes),
                });
            });
            it('triggers analytics events on zoom in', function () {
                var _a = setupBase(), component = _a.component, createAnalyticsEventSpy = _a.createAnalyticsEventSpy;
                component
                    .find(Button)
                    .last()
                    .simulate('click');
                expect(createAnalyticsEventSpy).toHaveBeenCalledWith({
                    eventType: 'ui',
                    action: 'clicked',
                    actionSubject: 'button',
                    actionSubjectId: 'zoomIn',
                    attributes: tslib_1.__assign({ zoomScale: 1.5 }, analyticsBaseAttributes),
                });
            });
        });
    });
});
//# sourceMappingURL=zoomControls.spec.js.map