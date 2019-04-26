import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
// We need to import Bricks in both ways because the way they create the dist doesn't play well with TS
import DefaultImportBricks from 'bricks.js';
import * as Bricks from 'bricks.js';
var BricksLayout = /** @class */ (function (_super) {
    tslib_1.__extends(BricksLayout, _super);
    function BricksLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BricksLayout.prototype.componentDidMount = function () {
        var _a = this.props, id = _a.id, _b = _a.packed, packed = _b === void 0 ? 'data-packed' : _b, _c = _a.sizes, sizes = _c === void 0 ? [{ columns: 3, gutter: 10 }] : _c;
        // We try to use the TS import, otherwise we use the "default" export
        var BricksConstructor = (typeof Bricks === 'function'
            ? Bricks
            : DefaultImportBricks);
        var instance = BricksConstructor({
            container: "#" + id,
            packed: packed,
            sizes: sizes,
        });
        instance.resize(true);
        this.setState({ instance: instance });
    };
    BricksLayout.prototype.componentDidUpdate = function (_a) {
        var prevChildren = _a.children;
        var children = this.props.children;
        var instance = this.state.instance;
        if (prevChildren.length === 0 && children.length === 0) {
            return;
        }
        return instance.pack();
    };
    BricksLayout.prototype.componentWillUnmount = function () {
        this.state.instance.resize(false);
    };
    BricksLayout.prototype.render = function () {
        var _a = this.props, id = _a.id, children = _a.children;
        return React.createElement("div", { id: id }, children);
    };
    BricksLayout.defaultProps = {
        packed: 'data-packed',
        sizes: [{ columns: 3, gutter: 10 }],
    };
    return BricksLayout;
}(Component));
export { BricksLayout };
//# sourceMappingURL=bricksGrid.js.map