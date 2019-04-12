import * as tslib_1 from "tslib";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { getLoadingStyle } from './utils';
import { gridSize } from '@uidu/theme';
export default (function (_a) {
    var spacing = _a.spacing, icon = _a.icon, isOnlyChild = _a.isOnlyChild, isLoading = _a.isLoading, rest = tslib_1.__rest(_a, ["spacing", "icon", "isOnlyChild", "isLoading"]);
    return (jsx("span", tslib_1.__assign({ css: tslib_1.__assign({ alignSelf: 'center', display: 'flex', flexShrink: 0, lineHeight: 0, fontSize: 0, userSelect: 'none', margin: spacing === 'none'
                ? 0
                : isOnlyChild
                    ? "0 -" + gridSize() / 4 + "px"
                    : "0 " + gridSize() / 2 + "px" }, getLoadingStyle(isLoading)) }, rest), icon));
});
//# sourceMappingURL=IconWrapper.js.map