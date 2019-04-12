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
var ButtonWrapper = function (props) {
    var style = {
        alignSelf: 'center',
        display: 'inline-flex',
        flexWrap: 'nowrap',
        maxWidth: '100%',
        position: 'relative',
    };
    if (props.fit) {
        style.width = '100%';
        style.justifyContent = 'center';
    }
    var optionalProps = {};
    if (props.onClick) {
        optionalProps.onClick = props.onClick;
    }
    return (React.createElement("span", __assign({ style: style }, optionalProps), props.children));
};
export default ButtonWrapper;
//# sourceMappingURL=ButtonWrapper.js.map