import * as tslib_1 from "tslib";
import * as React from 'react';
var _state = 'error';
export var setState = function (state) {
    _state = state;
};
var InteractiveImg = /** @class */ (function (_super) {
    tslib_1.__extends(InteractiveImg, _super);
    function InteractiveImg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InteractiveImg.prototype.componentDidMount = function () {
        if (_state === 'error') {
            this.props.onError();
        }
        else {
            this.props.onLoad();
        }
    };
    InteractiveImg.prototype.render = function () {
        return React.createElement("div", null, "so empty");
    };
    return InteractiveImg;
}(React.Component));
export { InteractiveImg };
//# sourceMappingURL=_interactive-img.js.map