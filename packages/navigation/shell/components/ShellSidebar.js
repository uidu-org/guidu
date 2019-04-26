import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { Sidebar } from '../styled';
var Shell = /** @class */ (function (_super) {
    tslib_1.__extends(Shell, _super);
    function Shell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shell.prototype.render = function () {
        return React.createElement(Sidebar, tslib_1.__assign({}, this.props, { className: "d-none d-lg-flex" }));
    };
    return Shell;
}(PureComponent));
export default Shell;
//# sourceMappingURL=ShellSidebar.js.map