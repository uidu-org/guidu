import * as tslib_1 from "tslib";
/** @jsx jsx */
import { jsx } from '@emotion/core';
export default (function (_a) {
    var fit = _a.fit, children = _a.children, rest = tslib_1.__rest(_a, ["fit", "children"]);
    return (jsx("span", tslib_1.__assign({ css: tslib_1.__assign({ alignSelf: 'center', display: 'inline-flex', flexWrap: 'nowrap', maxWidth: '100%', position: 'relative' }, (fit && { width: '100%' }), (fit && { justifyContent: 'center' })) }, rest), children));
});
//# sourceMappingURL=InnerWrapper.js.map