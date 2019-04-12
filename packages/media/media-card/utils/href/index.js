import * as tslib_1 from "tslib";
import * as React from 'react';
import * as cx from 'classnames';
import { Component } from 'react';
import { A } from './styled';
var Href = /** @class */ (function (_super) {
    tslib_1.__extends(Href, _super);
    function Href() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Href.prototype.render = function () {
        var _a = this.props, linkUrl = _a.linkUrl, underline = _a.underline, children = _a.children, className = _a.className, otherProps = tslib_1.__rest(_a, ["linkUrl", "underline", "children", "className"]);
        var classNames = cx(className, { underline: underline });
        return (React.createElement(A, tslib_1.__assign({}, otherProps, { href: linkUrl, className: classNames, target: "_blank", rel: "noopener" }), children));
    };
    return Href;
}(Component));
export { Href };
//# sourceMappingURL=index.js.map