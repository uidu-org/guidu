import * as tslib_1 from "tslib";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import { gridSize } from '@uidu/theme';
export var groupItemStyles = {
    flex: '1 0 auto',
    display: 'flex',
    /* margins don't flip when the layout uses dir="rtl", whereas pseudos do */
    '& + &::before': {
        content: "''",
        display: 'inline-block',
        width: gridSize() / 2 + "px",
    },
};
var ButtonGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroup, _super);
    function ButtonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroup.prototype.render = function () {
        var _a = this.props, appearance = _a.appearance, children = _a.children;
        return (jsx("div", { css: { display: 'inline-flex' } }, React.Children.map(children, function (child, idx) {
            if (!child) {
                return null;
            }
            return (jsx("div", { key: idx, css: groupItemStyles }, appearance
                ? React.cloneElement(child, { appearance: appearance })
                : child));
        })));
    };
    return ButtonGroup;
}(React.Component));
export default ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map