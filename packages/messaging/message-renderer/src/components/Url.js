import React from 'react';
import StyledUrl from '../styled/Url';
var isInternal = function (_a) {
    var host = _a.urlParts.host;
    return document.domain === host;
};
export default (function (props) {
    if (isInternal(props)) {
        return React.createElement(StyledUrl, { as: "a" }, props.children);
    }
    return (React.createElement(StyledUrl, { href: props.children, target: "_blank" }, props.children));
});
//# sourceMappingURL=Url.js.map