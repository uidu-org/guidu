import * as tslib_1 from "tslib";
import * as React from 'react';
import { colors } from '@uidu/theme';
import LockIcon from '@atlaskit/icon/glyph/lock-filled';
import Button from '@uidu/button';
import { truncateUrlForErrorView } from '../utils';
import { Frame } from '../Frame';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { AKIconWrapper } from '../Icon';
var InlineCardForbiddenView = /** @class */ (function (_super) {
    tslib_1.__extends(InlineCardForbiddenView, _super);
    function InlineCardForbiddenView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleRetry = function (event) {
            var onAuthorise = _this.props.onAuthorise;
            event.preventDefault();
            event.stopPropagation();
            onAuthorise();
        };
        return _this;
    }
    InlineCardForbiddenView.prototype.render = function () {
        var _a = this.props, url = _a.url, onClick = _a.onClick, isSelected = _a.isSelected, onAuthorise = _a.onAuthorise;
        return (React.createElement(Frame, { onClick: onClick, isSelected: isSelected },
            React.createElement(IconAndTitleLayout, { icon: React.createElement(AKIconWrapper, null,
                    React.createElement(LockIcon, { label: "error", size: "small", primaryColor: colors.B400 })), title: truncateUrlForErrorView(url) +
                    " - You don't have permissions to view" }),
            !onAuthorise ? ('') : (React.createElement(React.Fragment, null,
                ' ',
                React.createElement(Button, { spacing: "none", appearance: "link", onClick: this.handleRetry }, "Try another account")))));
    };
    return InlineCardForbiddenView;
}(React.Component));
export { InlineCardForbiddenView };
//# sourceMappingURL=index.js.map