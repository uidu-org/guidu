import * as tslib_1 from "tslib";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { gridSize } from '@uidu/theme';
import { getLoadingStyle } from './utils';
export default (function (_a) {
    var children = _a.children, followsIcon = _a.followsIcon, spacing = _a.spacing, isLoading = _a.isLoading, rest = tslib_1.__rest(_a, ["children", "followsIcon", "spacing", "isLoading"]);
    return (jsx("span", tslib_1.__assign({ css: tslib_1.__assign({ alignItems: followsIcon ? 'baseline' : 'center', alignSelf: followsIcon ? 'baseline' : 'center', flex: '1 1 auto', margin: spacing === 'none' ? 0 : "0 " + gridSize() / 2 + "px", maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, getLoadingStyle(isLoading)) }, rest), children));
});
//# sourceMappingURL=Content.js.map