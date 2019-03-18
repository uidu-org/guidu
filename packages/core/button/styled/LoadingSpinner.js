import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import Spinner from '@uidu/spinner';
var LoadingDiv = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"], ["\n  display: flex;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"])));
var LoadingSpinner = /** @class */ (function (_super) {
    tslib_1.__extends(LoadingSpinner, _super);
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