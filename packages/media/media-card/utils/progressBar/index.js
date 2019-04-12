import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { ProgressWrapper } from './styled';
var ProgressBar = /** @class */ (function (_super) {
    tslib_1.__extends(ProgressBar, _super);
    function ProgressBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressBar.prototype.render = function () {
        if (typeof this.props.progress !== 'number') {
            return null;
        }
        var progress = Math.min(1, Math.max(0, this.props.progress));
        var progressBarStyle = { width: progress * 100 + "%" };
        return (React.createElement(ProgressWrapper, null,
            React.createElement("div", { className: 'progressBar', style: progressBarStyle })));
    };
    return ProgressBar;
}(Component));
export { ProgressBar };
//# sourceMappingURL=index.js.map