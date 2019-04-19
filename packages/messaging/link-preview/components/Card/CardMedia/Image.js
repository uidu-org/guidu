import * as tslib_1 from "tslib";
import styled from 'styled-components';
import MediaWrap from './wrap';
import { imageProxy } from '../../../utils';
var Image = styled(MediaWrap)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  background-image: ", ";\n"], ["\n  background-image: ",
    ";\n"])), function (_a) {
    var imageUrl = _a.imageUrl;
    return imageUrl ? "url('" + imageProxy(imageUrl) + "')" : '';
});
Image.defaultProps = {};
export default Image;
var templateObject_1;
//# sourceMappingURL=Image.js.map