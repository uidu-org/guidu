import * as tslib_1 from "tslib";
import * as React from 'react';
import { Wrapper } from './styled';
var LazyContent = /** @class */ (function (_super) {
    tslib_1.__extends(LazyContent, _super);
    function LazyContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyContent.prototype.render = function () {
        var _a = this.props, children = _a.children, placeholder = _a.placeholder, onRender = _a.onRender;
        return (React.createElement(Wrapper, { offset: 300, onRender: onRender, placeholder: placeholder, content: children }));
    };
    return LazyContent;
}(React.Component));
export { LazyContent };
//# sourceMappingURL=index.js.map