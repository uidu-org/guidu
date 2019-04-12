import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import FileIcon from '@atlaskit/icon/glyph/file';
import { Wrapper } from './styled';
export var getDimensionsWithDefault = function (dimensions) {
    if (dimensions === void 0) { dimensions = { width: '100%', height: '100%' }; }
    return {
        height: typeof dimensions.height === 'number'
            ? dimensions.height + "px"
            : dimensions.height,
        width: typeof dimensions.width === 'number'
            ? dimensions.width + "px"
            : dimensions.width,
    };
};
var CardLoading = /** @class */ (function (_super) {
    tslib_1.__extends(CardLoading, _super);
    function CardLoading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardLoading.prototype.render = function () {
        var dimensions = getDimensionsWithDefault(this.props.dimensions);
        return React.createElement(Wrapper, { dimensions: dimensions }, this.icon);
    };
    Object.defineProperty(CardLoading.prototype, "iconSize", {
        get: function () {
            return this.props.iconSize || 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardLoading.prototype, "icon", {
        get: function () {
            var iconSize = this.iconSize;
            return React.createElement(FileIcon, { label: "loading", size: iconSize });
        },
        enumerable: true,
        configurable: true
    });
    return CardLoading;
}(Component));
export { CardLoading };
//# sourceMappingURL=index.js.map