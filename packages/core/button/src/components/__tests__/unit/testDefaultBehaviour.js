var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { mount } from 'enzyme';
import * as React from 'react';
import cases from 'jest-in-case';
import Spinner from '@atlaskit/spinner';
import * as renderer from 'react-test-renderer';
import serializer, { matchers } from 'jest-emotion';
import Button from '../../Button';
import InnerWrapper from '../../InnerWrapper';
expect.extend(matchers);
expect.addSnapshotSerializer(serializer);
beforeEach(function () {
    jest.clearAllMocks();
});
describe('ak-button/default-behaviour', function () {
    it('button should have type="button" by default', function () {
        var wrapper = mount(React.createElement(Button, null));
        expect(wrapper.find('button').props().type).toBe('button');
    });
    it('should render button if there is no href property', function () {
        var wrapper = mount(React.createElement(Button, null));
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.find('a').length).toBe(0);
    });
    it('should render link if href property is set', function () {
        var wrapper = mount(React.createElement(Button, { href: "test" }));
        expect(wrapper.find('a').length).toBe(1);
        expect(wrapper.find('button').length).toBe(0);
    });
    it('should not render link without href prop, even if the target prop is set', function () {
        var wrapper = mount(React.createElement(Button, { target: "something" }));
        expect(wrapper.find('a').length).toBe(0);
        expect(wrapper.find('button').length).toBe(1);
    });
    it('should render span when the button is disabled and has href property', function () {
        var wrapper = mount(React.createElement(Button, { isDisabled: true, href: "test" }));
        expect(wrapper.find('span').first().length).toBe(1);
        expect(wrapper.find('button').length).toBe(0);
        expect(wrapper.find('a').length).toBe(0);
    });
    it("should not render span when the button is disabled, but doesn't have href", function () {
        var wrapper = mount(React.createElement(Button, { isDisabled: true }));
        expect(wrapper.find('StyledSpan').length).toBe(0);
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.find('a').length).toBe(0);
    });
    it('should render icon if the prop iconBefore is set', function () {
        var Icon = React.createElement("div", { id: "icon" });
        var wrapper = mount(React.createElement(Button, { href: "test", iconBefore: Icon }));
        expect(wrapper.contains(Icon)).toBe(true);
    });
    it('should render iconBefore before children', function () {
        var Icon = React.createElement("div", { id: "icon" }, "icon");
        var wrapper = mount(React.createElement(Button, { href: "test", iconBefore: Icon }, "button"));
        expect(wrapper.text()).toBe('iconbutton');
    });
    it('should render icon if the prop iconAfter is set', function () {
        var Icon = React.createElement("div", { id: "icon" });
        var wrapper = mount(React.createElement(Button, { href: "test", iconAfter: Icon }));
        expect(wrapper.contains(Icon)).toBe(true);
    });
    it('should render iconAfter after children', function () {
        var Icon = React.createElement("div", { id: "icon" }, "icon");
        var wrapper = mount(React.createElement(Button, { href: "test", iconAfter: Icon }, "button"));
        expect(wrapper.text()).toBe('buttonicon');
    });
    it('should render button with full container width', function () {
        var wrapper = mount(React.createElement(Button, { shouldFitContainer: true }));
        expect(wrapper.find(InnerWrapper).prop('fit')).toBe(true);
    });
    it('should render button without full container width', function () {
        var wrapper = mount(React.createElement(Button, null));
        expect(wrapper.find(InnerWrapper).prop('fit')).toBe(false);
    });
    it('should be able to render both of the icons', function () {
        var Icon1 = React.createElement("div", { id: "icon" }, "icon1");
        var Icon2 = React.createElement("div", { id: "icon" }, "icon2");
        var wrapper = mount(React.createElement(Button, { href: "test", iconBefore: Icon1, iconAfter: Icon2 }, "button"));
        expect(wrapper.contains(Icon1)).toBe(true);
        expect(wrapper.contains(Icon2)).toBe(true);
        expect(wrapper.text()).toBe('icon1buttonicon2');
    });
    it('should call onClick handler when link is clicked', function () {
        var spy = jest.fn();
        var wrapper = mount(React.createElement(Button, { href: "test", onClick: spy }, "button"));
        wrapper.find('a').simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should call onClick handler when button is clicked', function () {
        var spy = jest.fn();
        var wrapper = mount(React.createElement(Button, { onClick: spy }, "button"));
        wrapper.find('button').simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should not call onClick handler when button is clicked while loading', function () {
        var spy = jest.fn();
        var wrapper = mount(React.createElement(Button, { isLoading: true, onClick: spy }, "button"));
        wrapper.find(InnerWrapper).simulate('click');
        expect(spy).toHaveBeenCalledTimes(0);
    });
    it('should render tabIndex attribute when the tabIndex property is set', function () {
        var wrapper = mount(React.createElement(Button, { tabIndex: 0 }, "button"));
        expect(wrapper.find('button').is('[tabIndex=0]')).toBe(true);
        wrapper = mount(React.createElement(Button, { href: "#", tabIndex: 0 }, "link"));
        expect(wrapper.find('a').is('[tabIndex=0]')).toBe(true);
        wrapper = mount(React.createElement(Button, { tabIndex: 0, isDisabled: true }, "span"));
        expect(wrapper.find('button').is('[tabIndex=0]')).toBe(true);
    });
    it('should trigger onFocus handler on focus', function () {
        var spy = jest.fn();
        var wrapper = mount(React.createElement(Button, { tabIndex: 0, onFocus: spy }, "button"));
        var button = wrapper.find('button');
        button.prop('onFocus')({});
        expect(spy).toHaveBeenCalled();
    });
    it('should respect autofocus', function () {
        var wrapper = mount(React.createElement(Button, { id: "testID123", tabIndex: 0, autoFocus: true }, "button"));
        var id = document.activeElement ? document.activeElement.id : null;
        expect(wrapper.find('button').prop('id')).toEqual(id);
    });
    describe('isLoading', function () {
        it('should render the loading spinner when isLoading is true', function () {
            var wrapper = mount(React.createElement(Button, { isLoading: true }, "Some text"));
            expect(wrapper.find(Spinner).length).toEqual(1);
        });
        it('should not render the loading spinner when isLoading is false', function () {
            var wrapper = mount(React.createElement(Button, null, "Some text"));
            expect(wrapper.find(Spinner).length).toEqual(0);
        });
        it('set the opacity of the text to 0 when isLoading is true', function () {
            var wrapper = renderer
                .create(React.createElement(Button, { isLoading: true }, "Some text"))
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
    it('should trigger onBlur handler on blur', function () {
        var spy = jest.fn();
        var wrapper = mount(React.createElement(Button, { tabIndex: 0, onBlur: spy }, "button"));
        var button = wrapper.find('button');
        button.prop('onBlur')({});
        expect(spy).toHaveBeenCalled();
    });
    cases('onMouse* prop is called', function (_a) {
        var _b;
        var key = _a.key;
        var spy = jest.fn();
        var onMouseHandler = (_b = {}, _b[key] = spy, _b);
        var wrapper = mount(React.createElement(Button, __assign({}, onMouseHandler), "Button"));
        var button = wrapper.find('button');
        var event = {
            preventDefault: function () { },
        };
        // @ts-ignore
        button.prop(key)(event);
        expect(spy).toHaveBeenCalled();
    }, [
        { key: 'onMouseDown' },
        { key: 'onMouseUp' },
        { key: 'onMouseEnter' },
        { key: 'onMouseLeave' },
    ]);
});
//# sourceMappingURL=testDefaultBehaviour.js.map