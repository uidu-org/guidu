import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent, } from '@uidu/analytics';
import withDeprecationWarnings from './withDeprecationWarnings';
import getButtonProps from './getButtonProps';
import CustomComponentProxy from './CustomComponentProxy';
import getButtonStyles from '../styled/getButtonStyles';
import ButtonContent from '../styled/ButtonContent';
import ButtonWrapper from '../styled/ButtonWrapper';
import IconWrapper from '../styled/IconWrapper';
import LoadingSpinner from '../styled/LoadingSpinner';
import { name as packageName, version as packageVersion, } from '../version.json';
import { withDefaultProps } from '@atlaskit/type-helpers';
var StyledButton = styled.button(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), getButtonStyles);
StyledButton.displayName = 'StyledButton';
// Target the <a> here to override a:hover specificity.
var StyledLink = styled.a(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  a& {\n    ", ";\n  }\n"], ["\n  a& {\n    ", ";\n  }\n"])), getButtonStyles);
StyledLink.displayName = 'StyledLink';
var StyledSpan = styled.span(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), getButtonStyles);
StyledSpan.displayName = 'StyledSpan';
var createStyledComponent = function () {
    // Override pseudo-state specificity.
    // This is necessary because we don't know what DOM element the custom component will render.
    var component = styled(CustomComponentProxy)(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n    &,\n    a&,\n    &:hover,\n    &:active,\n    &:focus {\n      ", "\n    }\n  "], ["\n    &,\n    a&,\n    &:hover,\n    &:active,\n    &:focus {\n      ", "\n    }\n  "])), getButtonStyles);
    component.displayName = 'StyledCustomComponent';
    return component;
};
export var defaultProps = {
    appearance: 'default',
    isDisabled: false,
    isSelected: false,
    isLoading: false,
    spacing: 'default',
    type: 'button',
    shouldFitContainer: false,
    autoFocus: false,
};
var Button = /** @class */ (function (_super) {
    tslib_1.__extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isActive: false,
            isFocus: false,
            isHover: false,
        };
        _this.customComponent = null;
        _this.isInteractive = function () { return !_this.props.isDisabled && !_this.props.isLoading; };
        _this.onMouseEnter = function () {
            _this.setState({ isHover: true });
        };
        _this.onMouseLeave = function () { return _this.setState({ isHover: false, isActive: false }); };
        _this.onMouseDown = function (e) {
            e.preventDefault();
            _this.setState({ isActive: true });
        };
        _this.onMouseUp = function () { return _this.setState({ isActive: false }); };
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
        /* Swallow click events when the button is disabled to prevent inner child clicks bubbling up */
        _this.onInnerClick = function (e) {
            if (!_this.isInteractive()) {
                e.stopPropagation();
            }
            return true;
        };
        _this.getInnerRef = function (ref) {
            _this.button = ref;
            if (_this.props.innerRef) {
                _this.props.innerRef(ref);
            }
        };
        return _this;
    }
    Button.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.component !== nextProps.component) {
            delete this.customComponent;
        }
    };
    Button.prototype.componentDidMount = function () {
        if (this.props.autoFocus && this.button) {
            this.button.focus();
        }
    };
    Button.prototype.getStyledComponent = function () {
        if (this.props.component) {
            if (!this.customComponent) {
                this.customComponent = createStyledComponent();
            }
            return this.customComponent;
        }
        if (this.props.href) {
            return this.props.isDisabled ? StyledSpan : StyledLink;
        }
        return StyledButton;
    };
    Button.prototype.render = function () {
        var _a = this.props, children = _a.children, iconBefore = _a.iconBefore, iconAfter = _a.iconAfter, isLoading = _a.isLoading, shouldFitContainer = _a.shouldFitContainer, spacing = _a.spacing, appearance = _a.appearance, isSelected = _a.isSelected, isDisabled = _a.isDisabled;
        var buttonProps = getButtonProps(this);
        var StyledComponent = this.getStyledComponent();
        var iconIsOnlyChild = !!((iconBefore && !iconAfter && !children) ||
            (iconAfter && !iconBefore && !children));
        return (React.createElement(StyledComponent, tslib_1.__assign({ ref: this.getInnerRef }, buttonProps),
            React.createElement(ButtonWrapper, { onClick: this.onInnerClick, fit: !!shouldFitContainer },
                isLoading ? (React.createElement(LoadingSpinner, { spacing: spacing, appearance: appearance, isSelected: isSelected, isDisabled: isDisabled })) : null,
                iconBefore ? (React.createElement(IconWrapper, { isLoading: isLoading, spacing: buttonProps.spacing, isOnlyChild: iconIsOnlyChild }, iconBefore)) : null,
                children ? (React.createElement(ButtonContent, { isLoading: isLoading, followsIcon: !!iconBefore, spacing: buttonProps.spacing }, children)) : null,
                iconAfter ? (React.createElement(IconWrapper, { isLoading: isLoading, spacing: buttonProps.spacing, isOnlyChild: iconIsOnlyChild }, iconAfter)) : null)));
    };
    return Button;
}(React.Component));
export { Button };
export var DefaultedButton = withDefaultProps(defaultProps, Button);
export var ButtonBase = Button;
export var ButtonWithoutAnalytics = withDeprecationWarnings(DefaultedButton);
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
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
})(ButtonWithoutAnalytics));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Button.js.map