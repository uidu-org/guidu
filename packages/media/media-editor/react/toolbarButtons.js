import * as tslib_1 from "tslib";
import * as React from 'react';
import { ColorSquare, LineWidthBackCircle, LineWidthFrontCircle, ToolbarButton, ToolIcon, } from './styled';
import Arrow from '@atlaskit/icon/glyph/media-services/arrow';
import Brush from '@atlaskit/icon/glyph/media-services/brush';
import Line from '@atlaskit/icon/glyph/media-services/line';
import Text from '@atlaskit/icon/glyph/media-services/text';
var ColorButton = /** @class */ (function (_super) {
    tslib_1.__extends(ColorButton, _super);
    function ColorButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorButton.prototype.render = function () {
        var _a = this.props.color, red = _a.red, green = _a.green, blue = _a.blue;
        var buttonColor = "rgb(" + red + ", " + green + ", " + blue + ")";
        return (React.createElement(ToolbarButton, { selected: this.props.selected, onClick: this.props.onClick },
            React.createElement(ColorSquare, { color: buttonColor })));
    };
    return ColorButton;
}(React.Component));
export { ColorButton };
var LineWidthButton = /** @class */ (function (_super) {
    tslib_1.__extends(LineWidthButton, _super);
    function LineWidthButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthButton.prototype.render = function () {
        return (React.createElement(ToolbarButton, { selected: this.props.selected, onClick: this.props.onClick },
            React.createElement(LineWidthBackCircle, null,
                React.createElement(LineWidthFrontCircle, { width: this.props.lineWidth }))));
    };
    return LineWidthButton;
}(React.Component));
export { LineWidthButton };
var ToolButton = /** @class */ (function (_super) {
    tslib_1.__extends(ToolButton, _super);
    function ToolButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolButton.prototype.render = function () {
        return (React.createElement(ToolbarButton, { selected: this.props.selected, onClick: this.props.onClick },
            React.createElement(ToolIcon, null, this.createIcon())));
    };
    ToolButton.prototype.createIcon = function () {
        var tool = this.props.tool;
        var size = 'medium';
        switch (tool) {
            case 'arrow':
                return React.createElement(Arrow, { label: tool, size: size });
            case 'line':
                return React.createElement(Line, { label: tool, size: size });
            case 'brush':
                return React.createElement(Brush, { label: tool, size: size });
            case 'text':
                return React.createElement(Text, { label: tool, size: size });
            default:
                return null;
        }
    };
    return ToolButton;
}(React.Component));
export { ToolButton };
//# sourceMappingURL=toolbarButtons.js.map