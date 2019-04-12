import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import MoreIcon from '@atlaskit/icon/glyph/more';
import DropdownMenu, { DropdownItemGroup, DropdownItem, } from '@uidu/dropdown-menu';
import { CardActionButton } from './styled';
var CardActionsDropdownMenu = /** @class */ (function (_super) {
    tslib_1.__extends(CardActionsDropdownMenu, _super);
    function CardActionsDropdownMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardActionsDropdownMenu.prototype.render = function () {
        var _a = this.props, actions = _a.actions, triggerColor = _a.triggerColor, onOpenChange = _a.onOpenChange;
        if (actions.length > 0) {
            return (React.createElement(DropdownMenu, { onOpenChange: onOpenChange, trigger: React.createElement(CardActionButton, { style: { color: triggerColor } },
                    React.createElement(MoreIcon, { label: "more" })) },
                React.createElement(DropdownItemGroup, null, actions.map(function (_a, index) {
                    var label = _a.label, handler = _a.handler;
                    return (React.createElement(DropdownItem, { key: index, onClick: handler }, label));
                }))));
        }
        else {
            return null;
        }
    };
    return CardActionsDropdownMenu;
}(Component));
export { CardActionsDropdownMenu };
//# sourceMappingURL=cardActionsDropdownMenu.js.map