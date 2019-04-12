import * as tslib_1 from "tslib";
import * as React from 'react';
import { Wrapper, Left, Middle, Right } from './styled';
var MultiLineLayout = /** @class */ (function (_super) {
    tslib_1.__extends(MultiLineLayout, _super);
    function MultiLineLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiLineLayout.prototype.render = function () {
        var _a = this.props, left = _a.left, middle = _a.middle, right = _a.right;
        return (React.createElement(Wrapper, null,
            React.createElement(Left, null, left),
            React.createElement(Middle, null, middle),
            React.createElement(Right, null, right)));
    };
    return MultiLineLayout;
}(React.Component));
export { MultiLineLayout };
//# sourceMappingURL=index.js.map