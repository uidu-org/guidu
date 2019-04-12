import * as tslib_1 from "tslib";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import memoize from 'memoize-one';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent, } from '@uidu/analytics';
import { name as packageName, version as packageVersion, } from '../version.json';
import GlobalTheme from '@uidu/theme';
import { Theme } from '../theme';
import { mapAttributesToState, filterProps, composeRefs } from './utils';
import Content from './Content';
import InnerWrapper from './InnerWrapper';
import IconWrapper from './IconWrapper';
import LoadingSpinner from './LoadingSpinner';
var Button = /** @class */ (function (_super) {
    tslib_1.__extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // ref can be a range of things because we render button, a, span or other React components
        _this.button = React.createRef();
        // Makes sure we don't call ref every render.
        _this.getComposedRefs = memoize(composeRefs);
        _this.state = {
            isActive: false,
            isFocus: false,
            isHover: false,
        };
        _this.isInteractive = function () { return !_this.props.isDisabled && !_this.props.isLoading; };
        _this.onMouseEnter = function (e) {
            _this.setState({ isHover: true });
            if (_this.props.onMouseEnter) {
                _this.props.onMouseEnter(e);
            }
        };
        _this.onMouseLeave = function (e) {
            _this.setState({ isHover: false, isActive: false });
            if (_this.props.onMouseLeave) {
                _this.props.onMouseLeave(e);
            }
        };
        _this.onMouseDown = function (e) {
            e.preventDefault();
            _this.setState({ isActive: true });
            if (_this.props.onMouseDown) {
                _this.props.onMouseDown(e);
            }
        };
        _this.onMouseUp = function (e) {
            _this.setState({ isActive: false });
            if (_this.props.onMouseUp) {
                _this.props.onMouseUp(e);
            }
        };
        _this.onFocus = function (event) {
            _this.setState({ isFocus: true });
            if (_this.props.onFocus) {
                _this.props.onFocus(event);
            }
        };
        _this.onBlur = function (event) {
            _this.setState({ isFocus: false });
            if (_this.props.onBlur) {
                _this.props.onBlur(event);
            }
        };
        _this.getElement = function () {
            var _a = _this.props, href = _a.href, isDisabled = _a.isDisabled;
            if (href) {
                return isDisabled ? 'span' : 'a';
            }
            return 'button';
        };
        // Swallow click events when the button is disabled
        // to prevent inner child clicks bubbling up.
        _this.onInnerClick = function (e) {
            if (!_this.isInteractive()) {
                e.stopPropagation();
            }
            return true;
        };
        return _this;
    }
    Button.prototype.componentDidMount = function () {
        if (this.props.autoFocus && this.button instanceof HTMLButtonElement) {
            this.button.focus();
        }
    };
    Button.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.appearance, appearance = _b === void 0 ? 'default' : _b, children = _a.children, className = _a.className, CustomComponent = _a.component, consumerRef = _a.consumerRef, iconAfter = _a.iconAfter, iconBefore = _a.iconBefore, _c = _a.isDisabled, isDisabled = _c === void 0 ? false : _c, _d = _a.isLoading, isLoading = _d === void 0 ? false : _d, _e = _a.isSelected, isSelected = _e === void 0 ? false : _e, _f = _a.shouldFitContainer, shouldFitContainer = _f === void 0 ? false : _f, _g = _a.spacing, spacing = _g === void 0 ? 'default' : _g, _h = _a.theme, theme = _h === void 0 ? function (current, props) { return current(props); } : _h, rest = tslib_1.__rest(_a, ["appearance", "children", "className", "component", "consumerRef", "iconAfter", "iconBefore", "isDisabled", "isLoading", "isSelected", "shouldFitContainer", "spacing", "theme"]);
        var attributes = tslib_1.__assign({}, this.state, { isSelected: isSelected, isDisabled: isDisabled });
        var StyledButton = CustomComponent || this.getElement();
        var iconIsOnlyChild = !!((iconBefore && !iconAfter && !children) ||
            (iconAfter && !iconBefore && !children));
        var specifiers = function (styles) {
            if (StyledButton === 'a') {
                return {
                    'a&': styles,
                };
            }
            else if (StyledButton === CustomComponent) {
                return {
                    '&, a&, &:hover, &:active, &:focus': styles,
                };
            }
            return styles;
        };
        console.log(theme);
        return (jsx(Theme.Provider, { value: theme },
            jsx(GlobalTheme.Consumer, null, function (_a) {
                var mode = _a.mode;
                return (jsx(Theme.Consumer, tslib_1.__assign({ mode: mode, state: mapAttributesToState(attributes), iconIsOnlyChild: iconIsOnlyChild }, _this.props), function (_a) {
                    var buttonStyles = _a.buttonStyles, spinnerStyles = _a.spinnerStyles;
                    return (jsx(StyledButton, tslib_1.__assign({}, filterProps(rest, StyledButton), { ref: _this.getComposedRefs(_this.button, consumerRef), onMouseEnter: _this.onMouseEnter, onMouseLeave: _this.onMouseLeave, onMouseDown: _this.onMouseDown, onMouseUp: _this.onMouseUp, onFocus: _this.onFocus, onBlur: _this.onBlur, disabled: isDisabled, className: className, css: specifiers(buttonStyles) }),
                        jsx(InnerWrapper, { onClick: _this.onInnerClick, fit: !!shouldFitContainer },
                            isLoading && (jsx(LoadingSpinner, { spacing: spacing, appearance: appearance, isSelected: isSelected, isDisabled: isDisabled, styles: spinnerStyles })),
                            iconBefore && (jsx(IconWrapper, { isLoading: isLoading, spacing: spacing, isOnlyChild: iconIsOnlyChild, icon: iconBefore })),
                            children && (jsx(Content, { isLoading: isLoading, followsIcon: !!iconBefore, spacing: spacing }, children)),
                            iconAfter && (jsx(IconWrapper, { isLoading: isLoading, spacing: spacing, isOnlyChild: iconIsOnlyChild, icon: iconAfter })))));
                }));
            })));
    };
    Button.defaultProps = {
        appearance: 'default',
        autoFocus: false,
        isDisabled: false,
        isLoading: false,
        isSelected: false,
        shouldFitContainer: false,
        spacing: 'default',
        theme: function (current, props) { return current(props); },
        type: 'button',
    };
    return Button;
}(React.Component));
export { Button };
var createAndFireEventOnAtlaskit = createAndFireEvent('uidu');
var ButtonWithRef = React.forwardRef(function (props, ref) { return jsx(Button, tslib_1.__assign({}, props, { consumerRef: ref })); });
ButtonWithRef.displayName = 'Button';
// @ts-ignore
export default withAnalyticsContext({
    componentName: 'button',
    packageName: packageName,
    packageVersion: packageVersion,
})(withAnalyticsEvents({
    onClick: createAndFireEventOnAtlaskit({
        action: 'clicked',
        actionSubject: 'button',
        attributes: {
            componentName: 'button',
            packageName: packageName,
            packageVersion: packageVersion,
        },
    }),
})(ButtonWithRef));
//# sourceMappingURL=Button.js.map