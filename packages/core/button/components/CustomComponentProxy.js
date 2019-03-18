import * as tslib_1 from "tslib";
// @flow
import * as React from 'react';
import { cleanProps } from '@uidu/analytics';
var CustomComponentProxy = /** @class */ (function (_super) {
    tslib_1.__extends(CustomComponentProxy, _super);
    function CustomComponentProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomComponentProxy.prototype.render = function () {
        var _a = cleanProps(this.props), appearance = _a.appearance, children = _a.children, component = _a.component, isActive = _a.isActive, isDisabled = _a.isDisabled, isFocus = _a.isFocus, isHover = _a.isHover, isSelected = _a.isSelected, shouldFitContainer = _a.shouldFitContainer, fit = _a.fit, iconBefore = _a.iconBefore, iconAfter = _a.iconAfter, isLoading = _a.isLoading, proxiedProps = tslib_1.__rest(_a, ["appearance", "children", "component", "isActive", "isDisabled", "isFocus", "isHover", "isSelected", "shouldFitContainer", "fit", "iconBefore", "iconAfter", "isLoading"]);
        if (!component) {
            throw new Error('No custom component provided while trying to use custom button component');
        }
        var ProxiedComponent = component;
        return React.createElement(ProxiedComponent, tslib_1.__assign({}, proxiedProps), children);
    };
    return CustomComponentProxy;
}(React.Component));
export default CustomComponentProxy;
//# sourceMappingURL=CustomComponentProxy.js.map