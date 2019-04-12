import * as tslib_1 from "tslib";
import * as React from 'react';
import { colors } from '@uidu/theme';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Button from '@uidu/button';
import { truncateUrlForErrorView } from '../utils';
import { Frame } from '../Frame';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { AKIconWrapper } from '../Icon';
var InlineCardErroredView = /** @class */ (function (_super) {
    tslib_1.__extends(InlineCardErroredView, _super);
    function InlineCardErroredView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleRetry = function (event) {
            var onRetry = _this.props.onRetry;
            if (onRetry) {
                event.preventDefault();
                event.stopPropagation();
                onRetry();
            }
        };
        return _this;
    }
    InlineCardErroredView.prototype.render = function () {
        var _a = this.props, url = _a.url, message = _a.message, onClick = _a.onClick, onRetry = _a.onRetry, isSelected = _a.isSelected;
        return (React.createElement(Frame, { onClick: onClick, isSelected: isSelected },
            React.createElement(IconAndTitleLayout, { icon: React.createElement(AKIconWrapper, null,
                    React.createElement(ErrorIcon, { label: "error", size: "small", primaryColor: colors.R300 })), title: React.createElement("span", { style: { color: colors.R300 } }, truncateUrlForErrorView(url) + ' - ' + message.trim()) }),
            ' ',
            onRetry && (React.createElement(Button, { spacing: "none", appearance: "link", onClick: this.handleRetry }, "Try again"))));
    };
    return InlineCardErroredView;
}(React.Component));
export { InlineCardErroredView };
//# sourceMappingURL=index.js.map