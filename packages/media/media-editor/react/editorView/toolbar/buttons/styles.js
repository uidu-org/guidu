// tslint:disable:variable-name
import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
var optionsColorNormal = colors.N500;
var optionsColorActive = colors.B400;
var colorSampleOutlineColor = 'rgba(255, 255, 255, 0.5)';
export var ToolbarButton = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  cursor: pointer;\n  position: relative; /* for the child OptionsAreaBase which uses absolute positioning */\n  min-width: 32px;\n  height: 32px;\n  border-radius: 4px;\n  margin-left: 4px;\n  margin-right: 4px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"], ["\n  cursor: pointer;\n  position: relative; /* for the child OptionsAreaBase which uses absolute positioning */\n  min-width: 32px;\n  height: 32px;\n  border-radius: 4px;\n  margin-left: 4px;\n  margin-right: 4px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])));
export var ActiveToolbarButton = styled(ToolbarButton)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n"], ["\n  background-color: ", ";\n  color: ", ";\n"])), colors.N500, colors.N0);
export var OptionsIconWrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  right: -7px;\n  bottom: -10px;\n  color: ", ";\n"], ["\n  position: absolute;\n  right: -7px;\n  bottom: -10px;\n  color: ",
    ";\n"])), function (_a) {
    var isActive = _a.isActive;
    return isActive ? optionsColorActive : optionsColorNormal;
});
export var ColorSample = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  width: 18px;\n  height: 18px;\n  margin: 4px;\n  border-radius: 3px;\n  border-style: solid;\n  border-width: 1px;\n  border-color: ", ";\n  box-sizing: border-box;\n"], ["\n  width: 18px;\n  height: 18px;\n  margin: 4px;\n  border-radius: 3px;\n  border-style: solid;\n  border-width: 1px;\n  border-color: ", ";\n  box-sizing: border-box;\n"])), colorSampleOutlineColor);
export var DropdownLeftIconWrapper = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  margin-right: -6px;\n  margin-left: -8px;\n"], ["\n  margin-right: -6px;\n  margin-left: -8px;\n"])));
export var DropdownRightIconWrapper = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  margin-right: -10px;\n  margin-left: -8px;\n"], ["\n  margin-right: -10px;\n  margin-left: -8px;\n"])));
export var ButtonIconWrapper = styled.div(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  margin-right: -2px;\n  margin-left: -2px;\n"], ["\n  margin-right: -2px;\n  margin-left: -2px;\n"])));
export var ShapeTitle = styled.span(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  text-transform: capitalize;\n"], ["\n  text-transform: capitalize;\n"])));
export var GroupItem = styled.div(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  flex: 1 0 auto;\n  margin: 0 4px;\n"], ["\n  flex: 1 0 auto;\n  margin: 0 4px;\n"])));
export var Group = styled.div(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n  display: inline-flex;\n  margin: 0 -4px;\n"], ["\n  display: inline-flex;\n  margin: 0 -4px;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=styles.js.map