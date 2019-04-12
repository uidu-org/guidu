import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
import { ellipsis } from '../../../mixins';
var widgetHeight = 24;
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-grow: 1;\n  flex-wrap: wrap;\n  margin-top: 3px;\n\n  max-height: ", "px;\n  overflow: hidden;\n\n  & > * {\n    margin-right: 12px;\n  }\n  & > *:last-child {\n    margin-right: auto;\n  }\n"], ["\n  display: flex;\n  flex-grow: 1;\n  flex-wrap: wrap;\n  margin-top: 3px;\n\n  max-height: ", "px;\n  overflow: hidden;\n\n  & > * {\n    margin-right: 12px;\n  }\n  & > *:last-child {\n    margin-right: auto;\n  }\n"])), widgetHeight * 2);
export var WidgetWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  height: ", "px;\n  max-width: calc(100% - (2 * 12px));\n"], ["\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  height: ", "px;\n  max-width: calc(100% - (2 * 12px));\n"])), widgetHeight);
export var WidgetDetails = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n\n  /* space the widget items */\n  & > * + * {\n    margin-left: 4px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n\n  /* space the widget items */\n  & > * + * {\n    margin-left: 4px;\n  }\n"])));
export var Title = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  font-size: 12px;\n  line-height: ", ";\n"], ["\n  color: ", ";\n  font-size: 12px;\n  line-height: ", ";\n"])), colors.N300, 16 / 12);
export var Text = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  ", ";\n  color: ", ";\n  font-size: 12px;\n  line-height: ", ";\n"], ["\n  ", ";\n  color: ", ";\n  font-size: 12px;\n  line-height: ", ";\n"])), ellipsis('none'), colors.N800, 16 / 12);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=styled.js.map