import * as tslib_1 from "tslib";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import Spinner from '@uidu/spinner';
var appearances = ['primary', 'danger'];
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
            if (appearance !== undefined) {
                if (appearances.indexOf(appearance) !== -1) {
                    return true;
                }
            }
            return false;
        };
        return _this;
    }
    LoadingSpinner.prototype.render = function () {
        var _a = this.props, spacing = _a.spacing, styles = _a.styles;
        var spinnerSize = spacing !== 'default' ? 'small' : 'medium';
        return (jsx("div", { css: styles },
            jsx(Spinner, { size: spinnerSize, invertColor: this.invertSpinner() })));
    };
    return LoadingSpinner;
}(React.Component));
export default LoadingSpinner;
//# sourceMappingURL=LoadingSpinner.js.map