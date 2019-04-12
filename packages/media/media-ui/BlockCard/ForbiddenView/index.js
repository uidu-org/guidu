import * as tslib_1 from "tslib";
import * as React from 'react';
import Button from '@uidu/button';
import { colors } from '@uidu/theme';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import { CollapsedFrame } from '../CollapsedFrame';
import { minWidth, maxWidth } from '../dimensions';
import { CollapsedIconTitleDescriptionLayout } from '../CollapsedIconTitleDescriptionLayout';
import { IconBackground } from './styled';
var BlockCardForbiddenView = /** @class */ (function (_super) {
    tslib_1.__extends(BlockCardForbiddenView, _super);
    function BlockCardForbiddenView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleAuthorise = function (event) {
            var onAuthorise = _this.props.onAuthorise;
            if (onAuthorise) {
                event.preventDefault();
                event.stopPropagation();
                onAuthorise();
            }
        };
        return _this;
    }
    BlockCardForbiddenView.prototype.render = function () {
        var _a = this.props, url = _a.url, onClick = _a.onClick, onAuthorise = _a.onAuthorise, isSelected = _a.isSelected;
        return (React.createElement(CollapsedFrame, { isSelected: isSelected, minWidth: minWidth, maxWidth: maxWidth, onClick: onClick },
            React.createElement(CollapsedIconTitleDescriptionLayout, { icon: React.createElement(IconBackground, null,
                    React.createElement(LockFilledIcon, { label: "forbidden", size: "medium", primaryColor: colors.N0 })), title: url, description: React.createElement(React.Fragment, null,
                    "You don't have permission to view this.",
                    ' ',
                    onAuthorise && (React.createElement(Button, { appearance: "link", spacing: "none", onClick: this.handleAuthorise }, "Try another account"))) })));
    };
    return BlockCardForbiddenView;
}(React.Component));
export { BlockCardForbiddenView };
//# sourceMappingURL=index.js.map