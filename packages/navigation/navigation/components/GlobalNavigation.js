import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { ShellSidebar, ShellHeader, ShellBody, ShellFooter } from '@uidu/shell';
import { Transition } from 'react-transition-group';
import { FakeItemWrapper, FakeGlobalItemWrapper } from '../styled';
import GlobalItem from './GlobalItem';
var defaultStyle = {
    transition: 'transform 130ms ease-in',
    position: 'absolute',
    width: 'calc((100% - 4rem) * 0.25 + 4rem)',
    left: 0,
    backgroundColor: '#4C566A',
    height: '100%',
    willChange: 'transform',
};
var transitionStyles = {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)', zIndex: 30 },
    exiting: {
        transform: 'translateX(-100%)',
        transition: 'transform 300ms ease-out',
    },
    exited: { transform: 'translateX(-100%)' },
};
var GlobalNavigation = /** @class */ (function (_super) {
    tslib_1.__extends(GlobalNavigation, _super);
    function GlobalNavigation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        return _this;
    }
    GlobalNavigation.prototype.render = function () {
        var _this = this;
        var _a = this.props, header = _a.header, body = _a.body, footer = _a.footer, width = _a.width;
        var isOpen = this.state.isOpen;
        return [
            React.createElement(ShellSidebar, { style: {
                    width: '4rem',
                    backgroundColor: '#4C566A',
                    zIndex: 2,
                }, onMouseEnter: function () { return _this.setState({ isOpen: true }); } },
                React.createElement(ShellHeader, { className: "justify-content-center" },
                    React.createElement(GlobalItem, tslib_1.__assign({}, header))),
                React.createElement(ShellBody, { scrollable: true, className: "d-flex flex-column align-items-center" }, body.map(function (bodyItem) { return (React.createElement(GlobalItem, tslib_1.__assign({}, bodyItem))); })),
                React.createElement(ShellFooter, { className: "d-flex flex-column align-items-center py-3", style: { backgroundColor: 'rgba(255, 255, 255, .05)' } }, footer.map(function (footerItem) { return (React.createElement(GlobalItem, tslib_1.__assign({}, footerItem))); }))),
            React.createElement(Transition, { in: isOpen, timeout: 300 }, function (state) { return (React.createElement(ShellSidebar, { style: tslib_1.__assign({}, defaultStyle, transitionStyles[state]), onMouseLeave: function () { return _this.setState({ isOpen: false }); } },
                React.createElement(ShellHeader, null,
                    React.createElement(FakeGlobalItemWrapper, { style: { width: '4rem' } },
                        React.createElement(GlobalItem, tslib_1.__assign({}, header))),
                    React.createElement("h5", { className: "m-0 text-light" }, header.name)),
                React.createElement(ShellBody, { scrollable: true, className: "d-flex flex-column" }, body.map(function (bodyItem) { return (React.createElement(FakeItemWrapper, null,
                    React.createElement(FakeGlobalItemWrapper, { style: { width: '4rem' } },
                        React.createElement(GlobalItem, tslib_1.__assign({}, bodyItem))),
                    bodyItem.name)); })),
                React.createElement(ShellFooter, { className: "d-flex flex-column py-3", style: { backgroundColor: 'rgba(255, 255, 255, .05)' } }, footer.map(function (footerItem) { return (React.createElement(FakeItemWrapper, { as: "a", href: "#" },
                    React.createElement(FakeGlobalItemWrapper, { style: { width: '4rem' } },
                        React.createElement(GlobalItem, tslib_1.__assign({}, footerItem))),
                    footerItem.name)); })))); }),
        ];
    };
    return GlobalNavigation;
}(PureComponent));
export default GlobalNavigation;
//# sourceMappingURL=GlobalNavigation.js.map