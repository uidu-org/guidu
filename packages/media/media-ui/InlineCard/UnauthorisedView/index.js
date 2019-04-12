import * as tslib_1 from "tslib";
import * as React from 'react';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import Button from '@uidu/button';
import { truncateUrlForErrorView } from '../utils';
import { Frame } from '../Frame';
import { colors } from '@uidu/theme';
var InlineCardUnauthorizedView = /** @class */ (function (_super) {
    tslib_1.__extends(InlineCardUnauthorizedView, _super);
    function InlineCardUnauthorizedView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleConnectAccount = function (event) {
            var onAuthorise = _this.props.onAuthorise;
            event.preventDefault();
            event.stopPropagation();
            return onAuthorise();
        };
        return _this;
    }
    InlineCardUnauthorizedView.prototype.render = function () {
        var _a = this.props, url = _a.url, icon = _a.icon, onClick = _a.onClick, isSelected = _a.isSelected, onAuthorise = _a.onAuthorise;
        return (React.createElement(Frame, { onClick: onClick, isSelected: isSelected },
            React.createElement(IconAndTitleLayout, { icon: icon, title: React.createElement("span", { style: { color: colors.N500 } }, truncateUrlForErrorView(url)) }),
            !onAuthorise ? ('') : (React.createElement(React.Fragment, null,
                ' - ',
                React.createElement(Button, { spacing: "none", appearance: "link", onClick: this.handleConnectAccount }, "Connect your account to preview links")))));
    };
    return InlineCardUnauthorizedView;
}(React.Component));
export { InlineCardUnauthorizedView };
//# sourceMappingURL=index.js.map