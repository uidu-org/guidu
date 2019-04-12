import * as tslib_1 from "tslib";
import * as React from 'react';
import Button from '@uidu/button';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { colors } from '@uidu/theme';
import { CollapsedFrame } from '../CollapsedFrame';
import { minWidth, maxWidth } from '../dimensions';
import { CollapsedIconTitleDescriptionLayout } from '../CollapsedIconTitleDescriptionLayout';
var BlockCardErroredView = /** @class */ (function (_super) {
    tslib_1.__extends(BlockCardErroredView, _super);
    function BlockCardErroredView() {
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
    BlockCardErroredView.prototype.render = function () {
        var _a = this.props, url = _a.url, message = _a.message, onClick = _a.onClick, onRetry = _a.onRetry, isSelected = _a.isSelected;
        return (React.createElement(CollapsedFrame, { isSelected: isSelected, minWidth: minWidth, maxWidth: maxWidth, onClick: onClick },
            React.createElement(CollapsedIconTitleDescriptionLayout, { icon: React.createElement(WarningIcon, { label: "error", size: "medium", primaryColor: colors.Y300 }), title: url, description: React.createElement(React.Fragment, null,
                    message,
                    ' ',
                    onRetry && (React.createElement(Button, { appearance: "link", spacing: "none", onClick: this.handleRetry }, "Try again"))) })));
    };
    return BlockCardErroredView;
}(React.Component));
export { BlockCardErroredView };
//# sourceMappingURL=index.js.map