var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var getAppearanceProps = function (props, state) {
    var appearance = props.appearance, className = props.className, isDisabled = props.isDisabled, isLoading = props.isLoading, isSelected = props.isSelected, spacing = props.spacing, shouldFitContainer = props.shouldFitContainer;
    var isActive = state.isActive, isFocus = state.isFocus, isHover = state.isHover;
    return {
        appearance: appearance,
        className: className,
        disabled: isDisabled,
        isActive: isActive,
        isFocus: isFocus,
        isHover: isHover,
        isLoading: isLoading,
        isSelected: isSelected,
        spacing: spacing,
        fit: shouldFitContainer,
    };
};
var getInteractionProps = function (component) {
    var onBlur = component.onBlur, onFocus = component.onFocus, onMouseDown = component.onMouseDown, onMouseEnter = component.onMouseEnter, onMouseLeave = component.onMouseLeave, onMouseUp = component.onMouseUp;
    var tabIndex = component.props.tabIndex;
    // Block onClick/Keyboard submit while isLoading
    var onClick = component.props.isLoading
        ? function (e) { return e.preventDefault(); }
        : component.props.onClick;
    return {
        onBlur: onBlur,
        onClick: onClick,
        onFocus: onFocus,
        onMouseDown: onMouseDown,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onMouseUp: onMouseUp,
        tabIndex: tabIndex,
    };
};
var getLinkElementProps = function (props) {
    var href = props.href, target = props.target;
    return { href: href, target: target };
};
var getButtonElementProps = function (props) {
    var ariaHaspopup = props.ariaHaspopup, ariaExpanded = props.ariaExpanded, ariaControls = props.ariaControls, form = props.form, type = props.type;
    return {
        'aria-haspopup': ariaHaspopup,
        'aria-expanded': ariaExpanded,
        'aria-controls': ariaControls,
        form: form,
        type: type,
    };
};
var getButtonProps = function (component) {
    var props = component.props, state = component.state;
    var defaultProps = __assign({ id: props.id }, getAppearanceProps(props, state), getInteractionProps(component), { 'aria-label': props.ariaLabel });
    if (props.component) {
        return __assign({}, props, defaultProps);
    }
    if (props.href) {
        if (props.isDisabled) {
            return defaultProps;
        }
        return __assign({}, defaultProps, getLinkElementProps(props));
    }
    return __assign({}, defaultProps, getButtonElementProps(props));
};
export default getButtonProps;
//# sourceMappingURL=getButtonProps.js.map