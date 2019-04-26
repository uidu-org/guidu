import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
export var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: 100%;\n  overflow-y: scroll;\n\n  padding: 0 28px;\n"], ["\n  height: 100%;\n  overflow-y: scroll;\n\n  padding: 0 28px;\n"])));
export var GridCell = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", " margin-top: 5px;\n"], ["\n  ", " margin-top: 5px;\n"])), function (_a) {
    var width = _a.width;
    return "width: " + width + "px;";
});
export var Title = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  color: #091e42;\n  font-size: 20px;\n  margin-top: 15px;\n"], ["\n  color: #091e42;\n  font-size: 20px;\n  margin-top: 15px;\n"])));
export var ButtonContainer = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  margin-top: 20px;\n"], ["\n  display: flex;\n  justify-content: center;\n  margin-top: 20px;\n"])));
export var WarningContainer = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 50px;\n\n  /* Required to allow end users to select text in the error message */\n  cursor: auto;\n  user-select: text;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 50px;\n\n  /* Required to allow end users to select text in the error message */\n  cursor: auto;\n  user-select: text;\n"])));
export var WarningIconWrapper = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  width: 92px;\n"], ["\n  width: 92px;\n"])));
export var WarningImage = styled.img(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  width: 200px;\n"], ["\n  width: 200px;\n"])));
export var WarningHeading = styled.p(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  font-size: 14px;\n  font-weight: bold;\n  margin-bottom: 5px;\n"], ["\n  font-size: 14px;\n  font-weight: bold;\n  margin-bottom: 5px;\n"])));
export var WarningSuggestion = styled.p(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  font-size: 14px;\n  margin-top: 5px;\n"], ["\n  color: ", ";\n  font-size: 14px;\n  margin-top: 5px;\n"])), colors.N300);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=styles.js.map