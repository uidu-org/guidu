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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { matchers } from 'jest-emotion';
import * as renderer from 'react-test-renderer';
import Button from '../../Button';
var ThemedButton = function (props) { return (jsx(Button, __assign({ theme: function (current, themeProps) {
        var _a = current(themeProps), buttonStyles = _a.buttonStyles, spinnerStyles = __rest(_a, ["buttonStyles"]);
        return {
            buttonStyles: __assign({}, buttonStyles, { width: '100px', height: '200px', margin: '20px' }),
            spinnerStyles: __assign({}, spinnerStyles, { top: '90%' }),
        };
    } }, props))); };
expect.extend(matchers);
describe('Theme: button', function () {
    it('should render button styles defined in custom theme', function () {
        var wrapper = renderer.create(jsx(ThemedButton, null)).toJSON();
        expect(wrapper).toHaveStyleRule('width', '100px');
    });
    it('should render button styles defined in ADG theme if no custom theme passed in', function () {
        var wrapper = renderer
            .create(jsx(Button, { theme: function (current, props) { return current(props); } }))
            .toJSON();
        expect(wrapper).toHaveStyleRule('width', 'auto');
    });
    it('should render spinner styles in custom theme', function () {
        var wrapper = renderer.create(jsx(ThemedButton, { isLoading: true })).toJSON();
        var parent = wrapper && wrapper.children && wrapper.children[0].children;
        var child = parent && parent[0];
        expect(child).toHaveStyleRule('top', '90%');
    });
    it('should render spinner styles defined in ADG theme if no custom theme passed in', function () {
        var wrapper = renderer
            .create(jsx(Button, { isLoading: true, theme: function (current, props) { return current(props); } }))
            .toJSON();
        var parent = wrapper && wrapper.children && wrapper.children[0].children;
        var child = parent && parent[0];
        expect(child).toHaveStyleRule('top', '50%');
    });
});
//# sourceMappingURL=testTheme.js.map