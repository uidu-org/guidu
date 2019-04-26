import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import Spinner from '@uidu/spinner';
import { EscHelper } from '../escHelper';
import { CenterView } from '../styles';
var SpinnerView = /** @class */ (function (_super) {
    tslib_1.__extends(SpinnerView, _super);
    function SpinnerView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpinnerView.prototype.componentDidMount = function () {
        this.escHelper = new EscHelper(this.props.onCancel);
    };
    SpinnerView.prototype.componentWillUnmount = function () {
        if (this.escHelper) {
            this.escHelper.teardown();
        }
    };
    SpinnerView.prototype.render = function () {
        return (React.createElement(CenterView, null,
            React.createElement(Spinner, { size: "large", invertColor: true })));
    };
    return SpinnerView;
}(Component));
export { SpinnerView };
//# sourceMappingURL=spinnerView.js.map