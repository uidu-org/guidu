import * as tslib_1 from "tslib";
import * as React from 'react';
import Badge from '@uidu/badge';
import Lozenge from '@uidu/lozenge';
import Tooltip from '@uidu/tooltip';
import { ImageIcon } from '../../ImageIcon';
import { Wrapper, WidgetWrapper, WidgetDetails, Title, Text } from './styled';
var Widgets = /** @class */ (function (_super) {
    tslib_1.__extends(Widgets, _super);
    function Widgets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Widgets.prototype.renderTitle = function (title) {
        return React.createElement(Title, { key: "title" },
            title,
            ":");
    };
    Widgets.prototype.renderIcon = function (icon) {
        if (typeof icon === 'string') {
            return React.createElement(ImageIcon, { key: "icon", src: icon, size: 16 });
        }
        else {
            return icon;
        }
    };
    Widgets.prototype.renderBadge = function (badge) {
        return (React.createElement(Badge, { key: "badge", appearance: badge.appearance || 'default', value: badge.value, max: badge.max }));
    };
    Widgets.prototype.renderLozenge = function (lozenge) {
        return (React.createElement(Lozenge, { key: "lozenge", appearance: lozenge.appearance || 'default', isBold: lozenge.isBold }, lozenge.text));
    };
    Widgets.prototype.renderText = function (text) {
        return React.createElement(Text, { key: "text" }, text);
    };
    Widgets.prototype.renderWidgetDetails = function (attrs, tooltip) {
        if (tooltip) {
            return (React.createElement(Tooltip, { content: tooltip },
                React.createElement(WidgetDetails, null, attrs)));
        }
        else {
            return React.createElement(WidgetDetails, null, attrs);
        }
    };
    Widgets.prototype.renderWidget = function (key, detail) {
        var title = detail.title, text = detail.text, icon = detail.icon, badge = detail.badge, lozenge = detail.lozenge, tooltip = detail.tooltip;
        var attrs = [];
        if (title) {
            attrs.push(this.renderTitle(title));
        }
        if (icon) {
            attrs.push(this.renderIcon(icon));
        }
        if (badge) {
            attrs.push(this.renderBadge(badge));
        }
        if (lozenge) {
            attrs.push(this.renderLozenge(lozenge));
        }
        if (text) {
            attrs.push(this.renderText(text));
        }
        if (attrs.length === 0) {
            // tslint:disable-next-line
            console.warn("Widgets: A widget doesn't contain any supported attributes: " + JSON.stringify(attrs, null, 2));
            return null;
        }
        return (React.createElement(WidgetWrapper, { key: key }, this.renderWidgetDetails(attrs, tooltip)));
    };
    Widgets.prototype.render = function () {
        var _this = this;
        var _a = this.props.details, details = _a === void 0 ? [] : _a;
        if (details.length === 0) {
            return null;
        }
        return (React.createElement(Wrapper, null, details.map(function (detail, index) { return _this.renderWidget(index, detail); })));
    };
    return Widgets;
}(React.Component));
export default Widgets;
//# sourceMappingURL=index.js.map