import * as React from 'react';
import { shallow } from 'enzyme';
import { Content, findParent } from '../../../newgen/content';
import { ContentWrapper } from '../../../newgen/styled';
describe('<Content />', function () {
    jest.useFakeTimers();
    var setup = function () {
        var component = shallow(React.createElement(Content, null,
            React.createElement("div", null),
            React.createElement("div", null)));
        return {
            component: component,
        };
    };
    it('should render children', function () {
        var component = setup().component;
        expect(component.children()).toHaveLength(2);
    });
    it('should allow children to show controls', function () {
        var component = setup().component;
        expect(component
            .children()
            .at(1)
            .prop('showControls')).toBeDefined();
    });
    it('should handle mouse move', function () {
        var component = setup().component;
        expect(component.state('showControls')).toBeTruthy();
        component.find(ContentWrapper).simulate('mouseMove');
        jest.runOnlyPendingTimers();
        expect(component.state('showControls')).toBeFalsy();
    });
    it('should keep controls visible when user is hovering them', function () {
        var component = setup().component;
        var target = document.createElement('div');
        target.classList.add('mvng-hide-controls');
        component.find(ContentWrapper).simulate('mouseMove', {
            target: target,
        });
        jest.runOnlyPendingTimers();
        expect(component.state('showControls')).toBeTruthy();
    });
    it('should pass controls visibility down to <ContentWrapper />', function () {
        var component = setup().component;
        expect(component.find(ContentWrapper).prop('showControls')).toBeTruthy();
    });
    it('should clear the timeout when component gets unmounted', function () {
        var component = setup().component;
        var clearTimeout = jest.fn();
        component.instance()['clearTimeout'] = clearTimeout;
        component.unmount();
        expect(clearTimeout).toHaveBeenCalledTimes(1);
    });
});
describe('findParent()', function () {
    it('should return the parent element if the class matches', function () {
        var wrapper = document.createElement('div');
        var child = document.createElement('div');
        wrapper.classList.add('a', 'some-class');
        wrapper.appendChild(child);
        expect(findParent(child, 'some-class')).toEqual(wrapper);
    });
    it('should return the element itself if it returns the classname', function () {
        var child = document.createElement('div');
        child.classList.add('some-class');
        expect(findParent(child, 'some-class')).toEqual(child);
    });
    it('should return undefined if there is no parent element matching', function () {
        var wrapper = document.createElement('div');
        var child = document.createElement('div');
        wrapper.classList.add('a');
        wrapper.appendChild(child);
        expect(findParent(child, 'some-class')).toBeUndefined();
    });
    it('should respect passed max parent element as boundary', function () {
        var superWrapper = document.createElement('div');
        var wrapper = document.createElement('div');
        var child = document.createElement('div');
        wrapper.classList.add('some-class');
        superWrapper.appendChild(wrapper);
        wrapper.appendChild(child);
        expect(findParent(child, 'some-class', wrapper)).toBeUndefined();
    });
});
//# sourceMappingURL=content.spec.js.map