import * as tslib_1 from "tslib";
import * as React from 'react';
import { Frame } from '../Frame';
import Lozenge from '@uidu/lozenge';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
var InlineCardResolvedView = /** @class */ (function (_super) {
    tslib_1.__extends(InlineCardResolvedView, _super);
    function InlineCardResolvedView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineCardResolvedView.prototype.renderLozenge = function () {
        var lozenge = this.props.lozenge;
        if (!lozenge) {
            return null;
        }
        return (React.createElement(Lozenge, { appearance: lozenge.appearance || 'default', isBold: lozenge.isBold }, lozenge.text));
    };
    InlineCardResolvedView.prototype.render = function () {
        var _a = this.props, title = _a.title, isSelected = _a.isSelected, onClick = _a.onClick, icon = _a.icon, link = _a.link;
        return (React.createElement(Frame, { link: link, isSelected: isSelected, onClick: onClick },
            React.createElement(IconAndTitleLayout, { icon: icon, title: title }, this.renderLozenge())));
    };
    return InlineCardResolvedView;
}(React.Component));
export { InlineCardResolvedView };
//# sourceMappingURL=index.js.map