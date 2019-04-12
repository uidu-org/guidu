import * as tslib_1 from "tslib";
import * as React from 'react';
import { layers } from '@uidu/theme';
import Spinner from '@uidu/spinner';
import styled from 'styled-components';
var overlayZindex = layers.modal() + 10;
export var Blanket = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: ", ";\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  z-index: ", ";\n"])), overlayZindex);
Blanket.displayName = 'Blanket';
export var SpinnerWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"])));
SpinnerWrapper.displayName = 'SpinnerWrapper';
var defaultProps = {
    blankedColor: 'none',
    invertSpinnerColor: false,
};
export default (function (_a) {
    var blankedColor = _a.blankedColor, invertSpinnerColor = _a.invertSpinnerColor;
    return (React.createElement(Blanket, { style: { backgroundColor: blankedColor || defaultProps.blankedColor } },
        React.createElement(SpinnerWrapper, null,
            React.createElement(Spinner, { size: "large", invertColor: invertSpinnerColor || defaultProps.invertSpinnerColor }))));
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=modalSpinner.js.map