import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { Wrapper } from './styled';
import { CardActionIconButton } from './cardActionIconButton';
import { CardActionsDropdownMenu } from './cardActionsDropdownMenu';
import { PreventClickThrough } from '../preventClickThrough';
var CardActionsView = /** @class */ (function (_super) {
    tslib_1.__extends(CardActionsView, _super);
    function CardActionsView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardActionsView.prototype.render = function () {
        var actions = this.props.actions;
        if (!actions.length) {
            return null;
        }
        var primaryAction = actions.find(actionWithIcon);
        var otherActions = actions.filter(actionNotEqualTo(primaryAction));
        return (React.createElement(PreventClickThrough, null,
            React.createElement(Wrapper, null,
                primaryAction ? this.renderActionIconButton(primaryAction) : null,
                this.renderOtherActionButtons(otherActions))));
    };
    CardActionsView.prototype.renderActionIconButton = function (action) {
        var triggerColor = this.props.triggerColor;
        var icon = action.icon, handler = action.handler;
        return (React.createElement(CardActionIconButton, { icon: icon, triggerColor: triggerColor, onClick: function () { return handler(); } }));
    };
    CardActionsView.prototype.renderOtherActionButtons = function (actions) {
        if (actions.length === 0) {
            return null;
        }
        else {
            var _a = this.props, triggerColor = _a.triggerColor, onToggle = _a.onToggle;
            var firstActionWithIcon = actions.find(actionWithIcon);
            var otherActions = actions.filter(actionNotEqualTo(firstActionWithIcon));
            if (firstActionWithIcon && otherActions.length === 0) {
                return this.renderActionIconButton(firstActionWithIcon);
            }
            else {
                return (React.createElement(CardActionsDropdownMenu, { actions: actions, triggerColor: triggerColor, onOpenChange: onToggle }));
            }
        }
    };
    return CardActionsView;
}(Component));
export { CardActionsView };
function actionWithIcon(action) {
    return !!action.icon;
}
function actionNotEqualTo(otherAction) {
    return function (action) { return action !== otherAction; };
}
//# sourceMappingURL=cardActionsView.js.map