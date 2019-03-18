import * as tslib_1 from "tslib";
import * as React from 'react';
import { gridSize, math } from '@uidu/theme';
import { getLoadingStyle } from './utils';
var getMargin = function (props) {
    if (props.spacing === 'none') {
        return 0;
    }
    if (props.isOnlyChild) {
        return "0 -" + math.divide(gridSize, 4)(props) + "px";
    }
    return "0 " + math.divide(gridSize, 2)(props) + "px";
};
var IconWrapper = function (props) {
    var style = tslib_1.__assign({ alignSelf: 'center', display: 'flex', flexShrink: 0, lineHeight: 0, fontSize: 0, margin: getMargin(props), userSelect: 'none' }, getLoadingStyle(props));
    return React.createElement("span", { style: style }, props.children);
};
export default IconWrapper;
//# sourceMappingURL=IconWrapper.js.map