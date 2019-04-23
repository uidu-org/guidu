import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import classNames from 'classnames';
var NavbarItemTitle = styled(Link)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  transition: opacity 250ms;\n  cursor: pointer;\n  /* position above the dropdown, otherwise the dropdown will cover up the bottom sliver of the buttons */\n  position: relative;\n  // z-index: 2;\n  &:hover,\n  &:focus {\n    opacity: 0.9;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  transition: opacity 250ms;\n  cursor: pointer;\n  /* position above the dropdown, otherwise the dropdown will cover up the bottom sliver of the buttons */\n  position: relative;\n  // z-index: 2;\n  &:hover,\n  &:focus {\n    opacity: 0.9;\n  }\n"])));
var NavbarItemEl = styled.li(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  align-self: center;\n  position: relative;\n"], ["\n  align-self: center;\n  position: relative;\n"])));
var DropdownSlot = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  perspective: 1500px;\n  margin-top: 0.5rem;\n  // width: 50vw;\n"], ["\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  perspective: 1500px;\n  margin-top: 0.5rem;\n  // width: 50vw;\n"])));
var NavbarItem = /** @class */ (function (_super) {
    tslib_1.__extends(NavbarItem, _super);
    function NavbarItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMouseEnter = function () {
            var _a = _this.props, onMouseEnter = _a.onMouseEnter, index = _a.index;
            onMouseEnter(index);
        };
        return _this;
    }
    NavbarItem.prototype.render = function () {
        var _a = this.props, name = _a.name, path = _a.path, onMouseLeave = _a.onMouseLeave, children = _a.children, className = _a.className;
        return (React.createElement(NavbarItemEl, { onMouseEnter: this.onMouseEnter, onFocus: this.onMouseEnter },
            React.createElement(NavbarItemTitle, { to: path, className: classNames('nav-link py-3', className), onMouseEnter: this.onMouseEnter, onClick: onMouseLeave, onFocus: this.onMouseEnter }, name),
            React.createElement(DropdownSlot, null, children)));
    };
    return NavbarItem;
}(Component));
export default NavbarItem;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=NavbarItem.js.map