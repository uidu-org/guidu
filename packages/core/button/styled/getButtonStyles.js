import * as tslib_1 from "tslib";
import { css } from 'styled-components';
import { borderRadius, fontSize, gridSize, math } from '@uidu/theme';
import themeDefinitions from './themeDefinitions';
import { themeNamespace } from '../theme';
// TODO: Type correctly when @uidu/theme is typescript
var getProvidedTheme = function (_a) {
    var theme = _a.theme;
    return (theme && theme[themeNamespace]) || {};
};
var getAppearanceProperty = function (property, appearance, providedTheme, inBuiltTheme) {
    var defaultAppearanceStyles = inBuiltTheme.default;
    if (!appearance) {
        return defaultAppearanceStyles[property];
    }
    var providedAppearanceStyles = providedTheme[appearance];
    var inBuiltAppearanceStyles = inBuiltTheme[appearance];
    return ((providedAppearanceStyles && providedAppearanceStyles[property]) ||
        (inBuiltAppearanceStyles && inBuiltAppearanceStyles[property]) ||
        defaultAppearanceStyles[property]);
};
var getState = function (_a) {
    var disabled = _a.disabled, isActive = _a.isActive, isFocus = _a.isFocus, isHover = _a.isHover, isSelected = _a.isSelected;
    if (disabled) {
        return 'disabled';
    }
    if (isSelected && isFocus) {
        return 'focusSelected';
    }
    if (isSelected) {
        return 'selected';
    }
    if (isActive) {
        return 'active';
    }
    if (isHover) {
        return 'hover';
    }
    if (isFocus) {
        return 'focus';
    }
    return 'default';
};
export var getPropertyAppearance = function (property, props, definitions) {
    if (props === void 0) { props = {}; }
    if (definitions === void 0) { definitions = themeDefinitions; }
    var appearance = props.appearance;
    var fallbacks = definitions.fallbacks, inBuiltTheme = definitions.theme;
    var providedTheme = getProvidedTheme(props);
    var propertyStyles = getAppearanceProperty(property, appearance, providedTheme, inBuiltTheme);
    if (!propertyStyles) {
        return fallbacks[property] || 'initial';
    }
    var state = getState(props);
    return propertyStyles[state] || propertyStyles.default || fallbacks[property];
};
export default function getButtonStyles(props) {
    // $FlowFixMe - should be fixed when theme work is done
    var baseSize = fontSize(props);
    var buttonHeight = math.divide(math.multiply(gridSize, 4), baseSize)(props) + "em";
    var compactButtonHeight = math.divide(math.multiply(gridSize, 3), baseSize)(props) + "em";
    /**
     * Variable styles
     */
    var cursor = 'default';
    var height = buttonHeight;
    var lineHeight = buttonHeight;
    var outline = 'none';
    // $FlowFixMe - should be fixed when theme work is done
    var padding = "0 " + gridSize(props) + "px";
    var transitionDuration = '0.1s, 0.15s';
    var transition = 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
    var verticalAlign = 'middle';
    var width = 'auto';
    /**
     * Appearance + Theme styles
     */
    var background = getPropertyAppearance('background', props);
    var color = getPropertyAppearance('color', props);
    var boxShadowColor = getPropertyAppearance('boxShadowColor', props);
    var boxShadow = boxShadowColor
        ? css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n        box-shadow: 0 0 0 2px ", ";\n      "], ["\n        box-shadow: 0 0 0 2px ", ";\n      "])), boxShadowColor) : null;
    var textDecoration = getPropertyAppearance('textDecoration', props);
    // Spacing: Compact
    if (props.spacing === 'compact') {
        height = compactButtonHeight;
        lineHeight = compactButtonHeight;
    }
    // Spacing: None
    if (props.spacing === 'none') {
        height = 'auto';
        lineHeight = 'inherit';
        padding = '0';
        verticalAlign = 'baseline';
    }
    // Interaction: Hover
    if (props.isHover) {
        cursor = 'pointer';
        transition =
            'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
    }
    // Interaction: Active
    if (props.isActive) {
        transitionDuration = '0s';
    }
    // Interaction: Focus
    if (props.isFocus) {
        outline = 'none';
        transitionDuration = '0s, 0.2s';
    }
    // Disabled
    if (props.disabled) {
        cursor = 'not-allowed';
    }
    // Loading
    var isLoadingStyles = function (p) {
        return p.isLoading ? 'pointer-events: none;' : null;
    };
    // Fit to parent width
    if (props.fit) {
        width = '100%';
    }
    /* Note use of !important to override the ThemeReset on anchor tag styles */
    return css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    align-items: baseline;\n    background: ", ";\n    border-radius: ", "px;\n    border-width: 0;\n    box-sizing: border-box;\n    color: ", " !important;\n    cursor: ", ";\n    display: inline-flex;\n    font-size: inherit;\n    font-style: normal;\n    height: ", ";\n    line-height: ", ";\n    margin: 0;\n    max-width: 100%;\n    outline: ", " !important;\n    padding: ", ";\n    text-align: center;\n    text-decoration: ", ";\n    transition: ", ";\n    transition-duration: ", ";\n    vertical-align: ", ";\n    white-space: nowrap;\n    width: ", ";\n    ", " &::-moz-focus-inner {\n      border: 0;\n      margin: 0;\n      padding: 0;\n    }\n    ", ";\n  "], ["\n    align-items: baseline;\n    background: ", ";\n    border-radius: ", "px;\n    border-width: 0;\n    box-sizing: border-box;\n    color: ", " !important;\n    cursor: ", ";\n    display: inline-flex;\n    font-size: inherit;\n    font-style: normal;\n    height: ", ";\n    line-height: ", ";\n    margin: 0;\n    max-width: 100%;\n    outline: ", " !important;\n    padding: ", ";\n    text-align: center;\n    text-decoration: ", ";\n    transition: ", ";\n    transition-duration: ", ";\n    vertical-align: ", ";\n    white-space: nowrap;\n    width: ", ";\n    ", " &::-moz-focus-inner {\n      border: 0;\n      margin: 0;\n      padding: 0;\n    }\n    ", ";\n  "])), background, borderRadius, color, cursor, height, lineHeight, outline, padding, textDecoration, transition, transitionDuration, verticalAlign, width, boxShadow, isLoadingStyles);
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=getButtonStyles.js.map