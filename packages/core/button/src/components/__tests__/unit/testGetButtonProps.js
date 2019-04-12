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
import * as React from 'react';
import { mount } from 'enzyme';
import Button, { ButtonGroup } from '../../..';
var Component = React.forwardRef(function (props, ref) { return null; });
var customProps = { customProp: 1 };
describe('getButtonProps', function () {
    it('should pass through all props to a custom component', function () {
        var cmp = mount(React.createElement(Button, __assign({}, customProps, { component: Component })));
        expect(cmp.find(Component).prop('customProp')).toBe(1);
    });
    it('should not pass through all props to an inbuilt component', function () {
        var cmp = mount(React.createElement(Button, __assign({}, customProps)));
        expect(cmp.find('button').prop('customProp')).toBe(1);
    });
    it('should add appearance props', function () {
        var cmp = mount(React.createElement(Button, null));
        expect(Object.keys(cmp.find('button').props())).toEqual(expect.arrayContaining([
            'onClick',
            'autoFocus',
            'onMouseEnter',
            'onMouseLeave',
            'onMouseDown',
            'onMouseUp',
            'onFocus',
            'onBlur',
        ]));
    });
    it('should add interaction handler props', function () {
        var cmp = mount(React.createElement(Button, null));
        expect(Object.keys(cmp.find('button').props())).toEqual(expect.arrayContaining([
            'onBlur',
            'onFocus',
            'onMouseDown',
            'onMouseEnter',
            'onMouseLeave',
            'onMouseUp',
        ]));
    });
    it('should pass interaction handler functions directly from the component', function () {
        var onBlur = function () { };
        var onFocus = function () { };
        var onMouseDown = function () { };
        var onMouseEnter = function () { };
        var onMouseLeave = function () { };
        var onMouseUp = function () { };
        var cmp = mount(React.createElement(Button, { onBlur: onBlur, onFocus: onFocus, onMouseDown: onMouseDown, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onMouseUp: onMouseUp }));
        expect(cmp.find('button').prop('onBlur')).not.toBe(onBlur);
        expect(cmp.find('button').prop('onFocus')).not.toBe(onFocus);
        expect(cmp.find('button').prop('onMouseDown')).not.toBe(onMouseDown);
        expect(cmp.find('button').prop('onMouseEnter')).not.toBe(onMouseEnter);
        expect(cmp.find('button').prop('onMouseLeave')).not.toBe(onMouseLeave);
        expect(cmp.find('button').prop('onMouseUp')).not.toBe(onMouseUp);
    });
    it('should pass the onClick handler from props', function () {
        var onClick = function () { };
        var cmp = mount(React.createElement(Button, { onClick: onClick }));
        expect(cmp.find('button').prop('onClick')).toEqual(expect.anything());
    });
    it('should add href and target props to a link', function () {
        var cmp = mount(React.createElement(Button, { href: "#", target: "" }));
        expect(Object.keys(cmp.find('a').props())).toEqual(expect.arrayContaining(['href', 'target']));
        var cmp2 = mount(React.createElement(Button, { href: "#", target: "", isDisabled: true }));
        expect(Object.keys(cmp2
            .find('span')
            .first()
            .props())).not.toEqual(expect.arrayContaining(['href', 'target']));
    });
});
describe('getButtonGroupProps > ', function () {
    it('should not default appearance', function () {
        var cmp = mount(React.createElement(ButtonGroup, null, React.createElement(Button, { appearance: "primary" })));
        expect(cmp.find(Button).prop('appearance')).toBe('primary');
    });
    it('should not default to another value if changed', function () {
        var cmp = mount(React.createElement(ButtonGroup, null, React.createElement(Button, { appearance: "warning" })));
        expect(cmp.find(Button).prop('appearance')).toBe('warning');
    });
});
//# sourceMappingURL=testGetButtonProps.js.map