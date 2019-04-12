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
import withDeprecationWarnings from './withDeprecationWarnings';
import Group, { GroupItem } from '../styled/ButtonGroup';
var ButtonGroup = /** @class */ (function (_super) {
    __extends(ButtonGroup, _super);
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