var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { css } from 'styled-components';
var isLoadingStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  transition: opacity 0.3s;\n  opacity: ", ";\n"], ["\n  transition: opacity 0.3s;\n  opacity: ", ";\n"])), function (_a) {
    var isLoading = _a.isLoading;
    return (isLoading ? 0 : 1);
});
var getLoadingStyle = function (_a) {
    var isLoading = _a.isLoading;
    return ({
        transition: 'opacity 0.3s',
        opacity: isLoading ? 0 : 1,
    });
};
export { isLoadingStyle, getLoadingStyle };
var templateObject_1;
//# sourceMappingURL=utils.js.map