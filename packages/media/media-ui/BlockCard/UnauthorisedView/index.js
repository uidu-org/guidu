import * as tslib_1 from "tslib";
import * as React from 'react';
import Button from '@uidu/button';
import { CollapsedFrame } from '../CollapsedFrame';
import { minWidth, maxWidth } from '../dimensions';
import { CollapsedIconTitleDescriptionLayout } from '../CollapsedIconTitleDescriptionLayout';
import { ImageIcon } from '../ImageIcon';
var BlockCardUnauthorisedView = /** @class */ (function (_super) {
    tslib_1.__extends(BlockCardUnauthorisedView, _super);
    function BlockCardUnauthorisedView() {
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
    BlockCardUnauthorisedView.prototype.render = function () {
        var _a = this.props, icon = _a.icon, url = _a.url, onClick = _a.onClick, onAuthorise = _a.onAuthorise, isSelected = _a.isSelected;
        return (React.createElement(CollapsedFrame, { isSelected: isSelected, minWidth: minWidth, maxWidth: maxWidth, onClick: onClick },
            React.createElement(CollapsedIconTitleDescriptionLayout, { icon: React.createElement(ImageIcon, { src: icon, size: 24 }), title: url, description: "Connect your account to see a link preview", other: onAuthorise && (React.createElement(Button, { appearance: "subtle", spacing: "compact", onClick: this.handleAuthorise }, "Connect")) })));
    };
    return BlockCardUnauthorisedView;
}(React.Component));
export { BlockCardUnauthorisedView };
//# sourceMappingURL=index.js.map