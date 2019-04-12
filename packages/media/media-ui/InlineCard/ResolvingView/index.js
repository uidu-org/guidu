import * as tslib_1 from "tslib";
import * as React from 'react';
import { Frame } from '../Frame';
import Spinner from '@uidu/spinner';
import { IconAndTitleLayout } from '../IconAndTitleLayout';
import { IconPlaceholderWrapper } from '../Icon';
var InlineCardResolvingView = /** @class */ (function (_super) {
    tslib_1.__extends(InlineCardResolvingView, _super);
    function InlineCardResolvingView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineCardResolvingView.prototype.render = function () {
        var _a = this.props, url = _a.url, onClick = _a.onClick, isSelected = _a.isSelected;
        return (React.createElement(Frame, { onClick: onClick, isSelected: isSelected },
            React.createElement(IconAndTitleLayout, { icon: React.createElement(IconPlaceholderWrapper, null,
                    React.createElement(Spinner, { size: 16 })), title: url })));
    };
    return InlineCardResolvingView;
}(React.Component));
export { InlineCardResolvingView };
//# sourceMappingURL=index.js.map