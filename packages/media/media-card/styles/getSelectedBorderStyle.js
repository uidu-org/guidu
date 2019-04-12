import { colors } from '@uidu/theme';
import { borderRadius } from '@uidu/media-ui';
/*
 * Used to display the blue border around a selected card without
 * shrinking the image OR growing the card size
 */
export var getSelectedBorderStyle = function (_a) {
    var selected = _a.selected;
    var border = "border: 2px solid " + (selected ? colors.B200 : 'transparent') + ";";
    return "\n    &::after {\n      content: '';\n      width: 100%;\n      height: 100%;\n      position: absolute;\n      top: 0;\n      box-sizing: border-box;\n      pointer-events: none;\n      " + borderRadius + " \n      " + border + ";\n    }\n  ";
};
//# sourceMappingURL=getSelectedBorderStyle.js.map