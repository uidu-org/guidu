import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import Tooltip from '@uidu/tooltip';
import StyledGlobalItem, { StyledGlobalItemButton } from './styled';
var GlobalItem = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalItem, _super);
    function GlobalItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GlobalItem.prototype.render = function () {
        var _a = this.props, badge = _a.badge, tooltip = _a.tooltip;
        return (React.createElement(Tooltip, { delay: 0, content: tooltip, position: "right", hideTooltipOnClick: true, hideTooltipOnMouseDown: true },
            React.createElement(StyledGlobalItem, null,
                React.createElement(StyledGlobalItemButton, tslib_1.__assign({}, this.props)),
                !!badge && (React.createElement("div", { style: {
                        pointerEvents: 'none',
                        position: 'absolute',
                        userSelect: 'none',
                        left: '20px',
                        top: '-4px',
                    } }, badge)))));
    };
    GlobalItem.defaultProps = {
        as: 'button',
        badge: undefined,
        tooltip: undefined,
    };
    return GlobalItem;
}(PureComponent));
export default GlobalItem;
//# sourceMappingURL=index.js.map