import * as tslib_1 from "tslib";
import * as React from 'react';
import { IconTitleWrapper, OtherWrapper } from './styled';
import { Icon } from '../Icon';
var IconAndTitleLayout = /** @class */ (function (_super) {
    tslib_1.__extends(IconAndTitleLayout, _super);
    function IconAndTitleLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconAndTitleLayout.prototype.renderIcon = function () {
        var icon = this.props.icon;
        return !icon ? null : (React.createElement(Icon, null, typeof icon === 'string' ? React.createElement("img", { src: icon }) : icon));
    };
    IconAndTitleLayout.prototype.render = function () {
        var _a = this.props, icon = _a.icon, title = _a.title, children = _a.children;
        return (React.createElement(React.Fragment, null,
            React.createElement(IconTitleWrapper, { hasIcon: !!icon },
                this.renderIcon(),
                title),
            children && React.createElement(OtherWrapper, null, children)));
    };
    return IconAndTitleLayout;
}(React.Component));
export { IconAndTitleLayout };
//# sourceMappingURL=index.js.map