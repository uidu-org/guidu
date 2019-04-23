// Stepper is a component to manage multiple step forms
// It uses React Router for managing sections
import * as tslib_1 from "tslib";
import { Component } from 'react';
import queryString from 'query-string';
import { animateScroll as scroll } from 'react-scroll';
import { withRouter } from 'react-router-dom';
var Stepper = /** @class */ (function (_super) {
    tslib_1.__extends(Stepper, _super);
    function Stepper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.steps = {};
        _this.getCurrentStepFormLocation = function () {
            var history = _this.props.history;
            return queryString.parse(history.location.search).s;
        };
        _this.getStepRect = function (step) {
            var scrollElement = _this.props.scrollElement;
            if (!scrollElement) {
                return step.getBoundingClientRect();
            }
            var containerPos = scrollElement.getBoundingClientRect();
            var stepPos = step.getBoundingClientRect();
            return {
                top: stepPos.top - containerPos.top,
                right: stepPos.right - containerPos.right,
                bottom: stepPos.bottom - containerPos.bottom,
                left: stepPos.left - containerPos.left,
            };
        };
        _this.getStepProps = function (_a) {
            if (_a === void 0) { _a = {}; }
            var rest = tslib_1.__rest(_a, []);
            var _b = _this, isStepActive = _b.isStepActive, toggleStep = _b.toggleStep, jumpToStep = _b.jumpToStep;
            return tslib_1.__assign({ ref: function (c) {
                    if (!c)
                        return;
                    _this.steps[c.props.name] = c;
                }, isActive: isStepActive, toggleStep: toggleStep,
                jumpToStep: jumpToStep }, rest);
        };
        _this.isStepActive = function (name) {
            return _this.getCurrentStepFormLocation() === name;
        };
        _this.toggleStep = function (name, step) {
            var history = _this.props.history;
            if (_this.isStepActive(name)) {
                history.replace("" + history.location.pathname);
            }
            else if (typeof _this.getCurrentStepFormLocation() == 'string') {
                // close other step and jump to new
                _this.jumpToStep(name);
            }
            else {
                _this.goToStep(name);
            }
        };
        // Should toggle current step and go to step
        _this.jumpToStep = function (to) {
            var from = _this.getCurrentStepFormLocation();
            _this.jumpToNextStep(from, to);
        };
        _this.jumpToNextStep = function (from, to) {
            // transitionToPromise(origin).then(() => this.goToStep(name, target));
            _this.goToStep(to);
        };
        _this.goToStep = function (name) {
            var _a = _this.props, history = _a.history, scrollElement = _a.scrollElement;
            var step = _this.steps[name].step.current;
            var that = _this;
            history.replace(history.location.pathname + "?s=" + name);
            setTimeout(function () {
                if (scrollElement) {
                    scroll.scrollTo(that.getStepRect(step).top + scrollElement.scrollTop - 16, {
                        duration: 300,
                        delay: 50,
                        smooth: 'easeInOutQuad',
                        container: scrollElement,
                    });
                }
            }, 300);
        };
        return _this;
    }
    Stepper.prototype.componentDidMount = function () {
        var _a = this.props, history = _a.history, defaultStep = _a.defaultStep;
        // if (defaultStep && !this.getCurrentStepFormLocation()) {
        //   history.replace(`${history.location.pathname}?s=${defaultStep}`);
        // }
    };
    Stepper.prototype.render = function () {
        var _a = this, getStepProps = _a.getStepProps, jumpToStep = _a.jumpToStep, toggleStep = _a.toggleStep;
        var children = this.props.children;
        return children({
            // prop getters
            getStepProps: getStepProps,
            // actions
            jumpToStep: jumpToStep,
            toggleStep: toggleStep,
        });
    };
    return Stepper;
}(Component));
export default withRouter(Stepper);
//# sourceMappingURL=Stepper.js.map