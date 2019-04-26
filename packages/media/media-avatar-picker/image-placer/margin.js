import * as tslib_1 from "tslib";
import * as React from 'react';
import { MarginWrapperSquare, MarginWrapperCircle } from './styled';
var Margin = /** @class */ (function (_super) {
    tslib_1.__extends(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Margin.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, size = _a.size, circular = _a.circular;
        var Element = circular ? MarginWrapperCircle : MarginWrapperSquare;
        return React.createElement(Element, { width: width, height: height, size: size });
    };
    return Margin;
}(React.Component));
export { Margin };
//# sourceMappingURL=margin.js.map