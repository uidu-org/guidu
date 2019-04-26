import * as tslib_1 from "tslib";
import * as React from 'react';
import { Group, GroupItem } from './styles';
var ButtonGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroup, _super);
    function ButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroup.prototype.render = function () {
        var children = this.props.children;
        return (React.createElement(Group, null, React.Children.map(children, function (child, idx) {
            if (!child) {
                return null;
            }
            return React.createElement(GroupItem, { key: idx }, child);
        })));
    };
    return ButtonGroup;
}(React.Component));
export { ButtonGroup };
//# sourceMappingURL=buttonGroup.js.map