import * as tslib_1 from "tslib";
import { Component } from 'react';
export var keyCodes = {
    space: 32,
    m: 77,
};
var Shortcut = /** @class */ (function (_super) {
    tslib_1.__extends(Shortcut, _super);
    function Shortcut() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keyHandler = function (e) {
            var _a = _this.props, keyCode = _a.keyCode, handler = _a.handler;
            if (e.keyCode === keyCode) {
                handler();
            }
        };
        _this.init = function () {
            document.addEventListener('keydown', _this.keyHandler);
        };
        _this.release = function () {
            document.removeEventListener('keydown', _this.keyHandler);
        };
        return _this;
    }
    Shortcut.prototype.componentDidMount = function () {
        this.init();
    };
    Shortcut.prototype.componentWillUnmount = function () {
        this.release();
    };
    Shortcut.prototype.render = function () {
        return null;
    };
    return Shortcut;
}(Component));
export { Shortcut };
//# sourceMappingURL=shortcut.js.map