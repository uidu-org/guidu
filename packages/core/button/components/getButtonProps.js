import * as tslib_1 from "tslib";
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
    var defaultProps = tslib_1.__assign({ id: props.id }, getAppearanceProps(props, state), getInteractionProps(component), { 'aria-label': props.ariaLabel });
    if (props.component) {
        return tslib_1.__assign({}, props, defaultProps);
    }
    if (props.href) {
        if (props.isDisabled) {
            return defaultProps;
        }
        return tslib_1.__assign({}, defaultProps, getLinkElementProps(props));
    }
    return tslib_1.__assign({}, defaultProps, getButtonElementProps(props));
};
export default getButtonProps;
//# sourceMappingURL=getButtonProps.js.map