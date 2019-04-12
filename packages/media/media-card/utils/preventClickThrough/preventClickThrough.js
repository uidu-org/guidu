import * as React from 'react';
export function PreventClickThrough(_a) {
    var children = _a.children;
    return (React.createElement("span", { onClick: function (event) {
            event.stopPropagation();
            event.preventDefault();
        } }, children));
}
//# sourceMappingURL=preventClickThrough.js.map