var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import { gridSize } from '@uidu/theme';
export default styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-flex;\n"], ["\n  display: inline-flex;\n"])));
export var GroupItem = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 1 0 auto;\n  display: flex;\n\n  /* margins don't flip when the layout uses dir=\"rtl\", whereas pseudos do */\n  & + &::before {\n    content: '';\n    display: inline-block;\n    width: ", "px;\n  }\n"], ["\n  flex: 1 0 auto;\n  display: flex;\n\n  /* margins don't flip when the layout uses dir=\"rtl\", whereas pseudos do */\n  & + &::before {\n    content: '';\n    display: inline-block;\n    width: ", "px;\n  }\n"])), gridSize() / 2);
var templateObject_1, templateObject_2;
//# sourceMappingURL=ButtonGroup.js.map