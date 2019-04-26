import React from 'react';
import { Wrapper } from '../styled';
export default function Shell(_a) {
    var _b = _a.fixedHeight, fixedHeight = _b === void 0 ? true : _b, children = _a.children;
    return React.createElement(Wrapper, { fixedHeight: fixedHeight }, children);
}
//# sourceMappingURL=Shell.js.map