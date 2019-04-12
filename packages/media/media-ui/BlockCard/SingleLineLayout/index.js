import * as tslib_1 from "tslib";
import * as React from 'react';
import { Wrapper, Left, Middle, Right } from './styled';
var SingleLineLayout = /** @class */ (function (_super) {
    tslib_1.__extends(SingleLineLayout, _super);
    function SingleLineLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingleLineLayout.prototype.render = function () {
        var _a = this.props, left = _a.left, middle = _a.middle, right = _a.right;
        return (React.createElement(Wrapper, null,
            React.createElement(Left, null, left),
            React.createElement(Middle, null, middle),
            React.createElement(Right, null, right)));
    };
    return SingleLineLayout;
}(React.Component));
export { SingleLineLayout };
//# sourceMappingURL=index.js.map