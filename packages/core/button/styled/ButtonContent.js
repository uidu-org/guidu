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
var getAlignment = function (p) { return (p.followsIcon ? 'baseline' : 'center'); };
var gridSizeDiv2 = math.divide(gridSize, 2);
var getMargin = function (p) {
    return p.spacing === 'none' ? 0 : "0 " + gridSizeDiv2(p) + "px";
};
var ButtonContent = function (props) {
    var style = __assign({ alignItems: getAlignment(props), alignSelf: getAlignment(props), flex: '1 1 auto', margin: getMargin(props), maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, getLoadingStyle(props));
    return React.createElement("span", { style: style }, props.children);
};
export default ButtonContent;
//# sourceMappingURL=ButtonContent.js.map