import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import classNames from 'classnames';
import { Edit, Check } from 'react-feather';
import StyledStep, { StyledStepNumber, StyledStepHeader, StyledStepBody, } from '../styled/Step';
var Step = /** @class */ (function (_super) {
    tslib_1.__extends(Step, _super);
    function Step() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.step = React.createRef();
        _this.renderIcon = function () {
            var _a = _this.props, number = _a.number, isCompleted = _a.isCompleted, isEditable = _a.isEditable;
            if (isCompleted) {
                return isEditable ? (React.createElement(Edit, { size: 14, strokeWidth: 3 })) : (React.createElement(Check, { size: 14, strokeWidth: 3 }));
            }
            return number;
        };
        return _this;
    }
    Step.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, children = _b.children, 
        // props
        name = _b.name, label = _b.label, description = _b.description, scope = _b.scope, className = _b.className, 
        // state
        isActive = _b.isActive, isCompleted = _b.isCompleted, isDisabled = _b.isDisabled, 
        // Actions
        toggleStep = _b.toggleStep;
        return (React.createElement(StyledStep, { className: classNames(className, {
                active: isActive(name),
                disabled: isDisabled,
            }), ref: this.step, id: "step-" + name },
            React.createElement(StyledStepHeader, { role: "button", tabIndex: 0, onClick: function () { return toggleStep(name, _this.step); }, className: "media p-3" },
                React.createElement(StyledStepNumber, { className: classNames('mr-3', (_a = {},
                        _a["bg-" + (scope || 'primary')] = isActive(name) || isCompleted,
                        _a)) }, this.renderIcon()),
                React.createElement("div", { className: "step-title media-body align-self-center" },
                    React.createElement("h6", { className: "m-0 text-" + (scope || 'primary') }, label),
                    description && React.createElement("p", { className: "mb-0 text-muted" }, description))),
            React.createElement(StyledStepBody, { className: "step-body" }, isActive(name) && children)));
    };
    Step.defaultProps = {
        scope: null,
        description: null,
        className: null,
        style: null,
        isCompleted: false,
        isDisabled: false,
        isEditable: true,
    };
    return Step;
}(Component));
export default Step;
//# sourceMappingURL=Step.js.map