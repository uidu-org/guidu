import * as tslib_1 from "tslib";
import * as React from 'react';
import withDeprecationWarnings from './withDeprecationWarnings';
import Group, { GroupItem } from '../styled/ButtonGroup';
var ButtonGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroup, _super);
    function ButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroup.prototype.render = function () {
        var _a = this.props, appearance = _a.appearance, children = _a.children;
        return (React.createElement(Group, null, React.Children.map(children, function (child, idx) {
            if (!child) {
                return null;
            }
            return (React.createElement(GroupItem, { key: idx }, appearance
                ? React.cloneElement(child, { appearance: appearance })
                : child));
        })));
    };
    return ButtonGroup;
}(React.Component));
export default withDeprecationWarnings(ButtonGroup);
//# sourceMappingURL=ButtonGroup.js.map