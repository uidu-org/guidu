import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { CardActionButton } from './styled';
var CardActionIconButton = /** @class */ (function (_super) {
    tslib_1.__extends(CardActionIconButton, _super);
    function CardActionIconButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardActionIconButton.prototype.render = function () {
        var _a = this.props, icon = _a.icon, triggerColor = _a.triggerColor, onClick = _a.onClick;
        return (React.createElement(CardActionButton, { onClick: onClick, style: { color: triggerColor } }, icon));
    };
    return CardActionIconButton;
}(Component));
export { CardActionIconButton };
//# sourceMappingURL=cardActionIconButton.js.map