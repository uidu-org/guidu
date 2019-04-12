var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import * as React from 'react';
import styled from 'styled-components';
import Spinner from '@uidu/spinner';
var LoadingDiv = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"], ["\n  display: flex;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"])));
var LoadingSpinner = /** @class */ (function (_super) {
    __extends(LoadingSpinner, _super);
    function LoadingSpinner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.invertSpinner = function () {
            var _a = _this.props, appearance = _a.appearance, isSelected = _a.isSelected, isDisabled = _a.isDisabled;
            if (isSelected) {
                return true;
            }
            if (isDisabled) {
                return false;
            }
            if (appearance === 'primary' ||
                appearance === 'danger' ||
                appearance === 'help') {
                return true;
            }
            return false;
        };
        return _this;
    }
    LoadingSpinner.prototype.render = function () {
        var spacing = this.props.spacing;
        var spinnerSize = 'medium';
        if (spacing !== 'default') {
            spinnerSize = 'small';
        }
        return (React.createElement(LoadingDiv, null,
            React.createElement(Spinner, { size: spinnerSize, invertColor: this.invertSpinner() })));
    };
    return LoadingSpinner;
}(React.Component));
export default LoadingSpinner;
var templateObject_1;
//# sourceMappingURL=LoadingSpinner.js.map