import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Flipper } from 'react-flip-toolkit';
import Navbar from './Navbar';
import NavbarItem from './Navbar/NavbarItem';
import DropdownContainer from './DropdownContainer';
var AnimatedMenu = /** @class */ (function (_super) {
    tslib_1.__extends(AnimatedMenu, _super);
    function AnimatedMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            activeIndices: [],
            animatingOut: false,
        };
        _this.animatingOutTimeout = null;
        _this.resetDropdownState = function (i) {
            _this.setState({
                activeIndices: typeof i === 'number' ? [i] : [],
                animatingOut: false,
            });
            delete _this.animatingOutTimeout;
        };
        _this.onMouseEnter = function (i) {
            var activeIndices = _this.state.activeIndices;
            if (_this.animatingOutTimeout) {
                clearTimeout(_this.animatingOutTimeout);
                _this.resetDropdownState(i);
                return;
            }
            if (activeIndices[activeIndices.length - 1] === i)
                return;
            _this.setState(function (prevState) { return ({
                activeIndices: prevState.activeIndices.concat(i),
                animatingOut: false,
            }); });
        };
        _this.onMouseLeave = function () {
            var duration = _this.props.duration;
            _this.setState({
                animatingOut: true,
            });
            _this.animatingOutTimeout = setTimeout(_this.resetDropdownState, duration);
        };
        return _this;
    }
    AnimatedMenu.prototype.render = function () {
        var _this = this;
        var _a = this.props, duration = _a.duration, navbarConfig = _a.navbarConfig, otherProps = tslib_1.__rest(_a, ["duration", "navbarConfig"]);
        var _b = this.state, activeIndices = _b.activeIndices, animatingOut = _b.animatingOut;
        var CurrentDropdown;
        var PrevDropdown;
        var direction;
        var currentIndex = activeIndices[activeIndices.length - 1];
        var prevIndex = activeIndices.length > 1 && activeIndices[activeIndices.length - 2];
        if (typeof currentIndex === 'number') {
            CurrentDropdown = navbarConfig[currentIndex].dropdown;
        }
        if (typeof prevIndex === 'number') {
            PrevDropdown = navbarConfig[prevIndex].dropdown;
            direction = currentIndex > prevIndex ? 'right' : 'left';
        }
        return (React.createElement(Flipper, { flipKey: currentIndex, spring: duration === 300 ? 'noWobble' : { stiffness: 10, damping: 10 } },
            React.createElement(Navbar, { onMouseLeave: this.onMouseLeave }, navbarConfig.map(function (n, index) { return (React.createElement(NavbarItem, { key: n.path, className: n.className, name: n.name, path: n.path, index: index, onMouseEnter: _this.onMouseEnter, onMouseLeave: _this.onMouseLeave }, currentIndex === index && (React.createElement(DropdownContainer, { direction: direction, animatingOut: animatingOut, duration: duration },
                React.createElement(CurrentDropdown, tslib_1.__assign({ onMouseLeave: _this.onMouseLeave }, otherProps)),
                PrevDropdown && (React.createElement(PrevDropdown, tslib_1.__assign({ onMouseLeave: _this.onMouseLeave }, otherProps))))))); }))));
    };
    return AnimatedMenu;
}(Component));
export default AnimatedMenu;
//# sourceMappingURL=AnimatedMenu.js.map