import * as tslib_1 from "tslib";
import * as React from 'react';
import { MultiLineLayout } from '../MultiLineLayout';
import { Title, Description } from './styled';
var CollapsedIconTitleDescriptionLayout = /** @class */ (function (_super) {
    tslib_1.__extends(CollapsedIconTitleDescriptionLayout, _super);
    function CollapsedIconTitleDescriptionLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollapsedIconTitleDescriptionLayout.prototype.render = function () {
        var _a = this.props, icon = _a.icon, title = _a.title, description = _a.description, other = _a.other;
        return (React.createElement(MultiLineLayout, { left: icon, middle: React.createElement(React.Fragment, null,
                React.createElement(Title, null, title.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')),
                React.createElement(Description, null, description)), right: other }));
    };
    return CollapsedIconTitleDescriptionLayout;
}(React.Component));
export { CollapsedIconTitleDescriptionLayout };
//# sourceMappingURL=index.js.map