import * as tslib_1 from "tslib";
import React, { Component, Children } from 'react';
import { Flipped } from 'react-flip-toolkit';
import { DropdownRoot, Caret, DropdownBackground, AltBackground, InvertedDiv, } from './Components';
import FadeContents from './FadeContents';
var getFirstDropdownSectionHeight = function (el) {
    if (!el ||
        !el.querySelector ||
        !el.querySelector('*[data-first-dropdown-section]')) {
        return 0;
    }
    return el.querySelector('*[data-first-dropdown-section]').offsetHeight;
};
var updateAltBackground = function (_a) {
    var altBackground = _a.altBackground, prevDropdown = _a.prevDropdown, currentDropdown = _a.currentDropdown;
    var prevHeight = getFirstDropdownSectionHeight(prevDropdown);
    var currentHeight = getFirstDropdownSectionHeight(currentDropdown);
    var immediateSetTranslateY = function (el, translateY) {
        el.style.transform = "translateY(" + translateY + "px)";
        el.style.transition = 'transform 0s';
        requestAnimationFrame(function () { return (el.style.transitionDuration = ''); });
    };
    if (prevHeight) {
        // transition the grey ("alt") background from its previous height to its current height
        immediateSetTranslateY(altBackground, prevHeight);
        requestAnimationFrame(function () {
            altBackground.style.transform = "translateY(" + currentHeight + "px)";
        });
    }
    else {
        // just immediately set the background to the appropriate height
        // since we don't have a stored value
        immediateSetTranslateY(altBackground, currentHeight);
    }
};
var DropdownContainer = /** @class */ (function (_super) {
    tslib_1.__extends(DropdownContainer, _super);
    function DropdownContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.altBackgroundEl = React.createRef();
        _this.prevDropdownEl = React.createRef();
        _this.currentDropdownEl = React.createRef();
        return _this;
    }
    DropdownContainer.prototype.componentDidMount = function () {
        updateAltBackground({
            altBackground: this.altBackgroundEl.current,
            prevDropdown: this.prevDropdownEl.current,
            currentDropdown: this.currentDropdownEl.current,
        });
    };
    DropdownContainer.prototype.render = function () {
        var _a = this.props, children = _a.children, direction = _a.direction, animatingOut = _a.animatingOut, duration = _a.duration;
        var _b = tslib_1.__read(Children.toArray(children), 2), currentDropdown = _b[0], prevDropdown = _b[1];
        return (React.createElement(DropdownRoot, { direction: direction, animatingOut: animatingOut, duration: duration },
            React.createElement(Flipped, { flipId: "dropdown-caret" },
                React.createElement(Caret, null)),
            React.createElement(Flipped, { flipId: "dropdown" },
                React.createElement(DropdownBackground, null,
                    React.createElement(Flipped, { inverseFlipId: "dropdown" },
                        React.createElement(InvertedDiv, null,
                            React.createElement(AltBackground, { ref: this.altBackgroundEl, duration: duration }),
                            React.createElement(FadeContents, { direction: direction, duration: duration, ref: this.currentDropdownEl }, currentDropdown))),
                    React.createElement(Flipped, { inverseFlipId: "dropdown", scale: true },
                        React.createElement(InvertedDiv, { absolute: true }, prevDropdown && (React.createElement(FadeContents, { animatingOut: true, direction: direction, duration: duration, ref: this.prevDropdownEl }, prevDropdown))))))));
    };
    return DropdownContainer;
}(Component));
export default DropdownContainer;
//# sourceMappingURL=index.js.map