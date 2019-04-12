import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';
import { ErrorIconWrapper } from './styled';
var ErrorIcon = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorIcon, _super);
    function ErrorIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorIcon.prototype.render = function () {
        return (React.createElement(ErrorIconWrapper, null,
            React.createElement(WarningIcon, { label: "Error", size: "small" })));
    };
    return ErrorIcon;
}(Component));
export { ErrorIcon };
//# sourceMappingURL=index.js.map