var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// @flow
import * as React from 'react';
import { cleanProps } from '@uidu/analytics';
var CustomComponentProxy = /** @class */ (function (_super) {
    __extends(CustomComponentProxy, _super);
    function CustomComponentProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomComponentProxy.prototype.render = function () {
        var _a = cleanProps(this.props), appearance = _a.appearance, children = _a.children, component = _a.component, isActive = _a.isActive, isDisabled = _a.isDisabled, isFocus = _a.isFocus, isHover = _a.isHover, isSelected = _a.isSelected, shouldFitContainer = _a.shouldFitContainer, fit = _a.fit, iconBefore = _a.iconBefore, iconAfter = _a.iconAfter, isLoading = _a.isLoading, proxiedProps = __rest(_a, ["appearance", "children", "component", "isActive", "isDisabled", "isFocus", "isHover", "isSelected", "shouldFitContainer", "fit", "iconBefore", "iconAfter", "isLoading"]);
        if (!component) {
            throw new Error('No custom component provided while trying to use custom button component');
        }
        var ProxiedComponent = component;
        return React.createElement(ProxiedComponent, __assign({}, proxiedProps), children);
    };
    return CustomComponentProxy;
}(React.Component));
export default CustomComponentProxy;
//# sourceMappingURL=CustomComponentProxy.js.map