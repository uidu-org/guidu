import * as tslib_1 from "tslib";
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
    return (React.createElement("span", tslib_1.__assign({ style: style }, optionalProps), props.children));
};
export default ButtonWrapper;
//# sourceMappingURL=ButtonWrapper.js.map