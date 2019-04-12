var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var style = __assign({ alignSelf: 'center', display: 'flex', flexShrink: 0, lineHeight: 0, fontSize: 0, margin: getMargin(props), userSelect: 'none' }, getLoadingStyle(props));
    return React.createElement("span", { style: style }, props.children);
};
export default IconWrapper;
//# sourceMappingURL=IconWrapper.js.map