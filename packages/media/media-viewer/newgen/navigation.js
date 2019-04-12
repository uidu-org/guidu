import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import { colors } from '@uidu/theme';
import Button from '@uidu/button';
import { Shortcut } from '@uidu/media-ui';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { ArrowsWrapper, RightWrapper, LeftWrapper, Arrow, hideControlsClassName, } from './styled';
import { getSelectedIndex } from './utils';
import { channel } from './analytics';
import { createNavigationEvent, } from './analytics/navigation';
var NavigationBase = /** @class */ (function (_super) {
    tslib_1.__extends(NavigationBase, _super);
    function NavigationBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fireAnalytics = function (payload) {
            var createAnalyticsEvent = _this.props.createAnalyticsEvent;
            if (createAnalyticsEvent) {
                var ev = createAnalyticsEvent(payload);
                ev.fire(channel);
            }
        };
        return _this;
    }
    NavigationBase.prototype.navigate = function (direction, source) {
        var _this = this;
        return function () {
            var _a = _this.props, onChange = _a.onChange, items = _a.items;
            var selectedIndex = _this.selectedIndex;
            var newItem = direction === 'next'
                ? items[selectedIndex + 1]
                : items[selectedIndex - 1];
            if (newItem) {
                _this.fireAnalytics(createNavigationEvent(direction, source, newItem));
                onChange(newItem);
            }
        };
    };
    Object.defineProperty(NavigationBase.prototype, "selectedIndex", {
        get: function () {
            var _a = this.props, items = _a.items, selectedItem = _a.selectedItem;
            return getSelectedIndex(items, selectedItem);
        },
        enumerable: true,
        configurable: true
    });
    NavigationBase.prototype.render = function () {
        var _this = this;
        var items = this.props.items;
        var selectedIndex = this.selectedIndex;
        if (selectedIndex === -1) {
            return null;
        }
        var isLeftVisible = selectedIndex > 0;
        var isRightVisible = selectedIndex < items.length - 1;
        var prev = function (source) { return _this.navigate('prev', source); };
        var next = function (source) { return _this.navigate('next', source); };
        return (React.createElement(ArrowsWrapper, null,
            React.createElement(LeftWrapper, null, isLeftVisible ? (React.createElement(Arrow, { className: hideControlsClassName },
                React.createElement(Shortcut, { keyCode: 37, handler: prev('keyboard') }),
                React.createElement(Button, { onClick: prev('mouse'), iconBefore: React.createElement(ArrowLeftCircle, { strokeColor: colors.N800, size: 24, label: "Previous" }) }))) : null),
            React.createElement(RightWrapper, null, isRightVisible ? (React.createElement(Arrow, { className: hideControlsClassName },
                React.createElement(Shortcut, { keyCode: 39, handler: next('keyboard') }),
                React.createElement(Button, { onClick: next('mouse'), iconBefore: React.createElement(ArrowRightCircle, { strokeColor: colors.N800, size: 24, label: "Next" }) }))) : null)));
    };
    return NavigationBase;
}(Component));
export { NavigationBase };
export var Navigation = withAnalyticsEvents({})(NavigationBase);
//# sourceMappingURL=navigation.js.map