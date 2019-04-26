import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { NavigationHeader, NavigationItem, NavigationLink } from '../styled';
var Navigation = /** @class */ (function (_super) {
    tslib_1.__extends(Navigation, _super);
    function Navigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navigation.prototype.render = function () {
        var schema = this.props.schema;
        return schema.map(function (node) { return (React.createElement("ul", { className: "nav flex-column mb-4 px-3", key: node.name },
            (node.icon || node.name) && (React.createElement(NavigationItem, null,
                React.createElement(NavigationHeader, { className: "px-3" },
                    node.icon,
                    React.createElement("span", null, node.name)))),
            node.children.map(function (link) { return (React.createElement(NavigationItem, { key: link.path },
                React.createElement(NavigationLink, tslib_1.__assign({}, link.props, { exact: true, to: link.path, className: "px-3" }), link.name))); }))); });
    };
    return Navigation;
}(PureComponent));
export default Navigation;
//# sourceMappingURL=Navigation.js.map