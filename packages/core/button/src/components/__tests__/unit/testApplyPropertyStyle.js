import { applyPropertyStyle } from '../../../theme';
import { mapAttributesToState } from '../../utils';
var fallbacks = {
    propertyA: 'fallback-propertyA',
    propertyB: 'initial',
};
var themeDefinitions = {
    propertyA: {
        default: {
            default: {
                light: 'theme-propertyA-defaultAppearance-defaultValue-light',
                dark: 'theme-propertyA-defaultAppearance-defaultValue-dark',
            },
            hover: {
                light: 'theme-propertyA-defaultAppearance-hoverValue-light',
                dark: 'theme-propertyA-defaultAppearance-hoverValue-dark',
            },
            active: {
                light: 'theme-propertyA-defaultAppearance-activeValue-light',
                dark: 'theme-propertyA-defaultAppearance-activeValue-dark',
            },
            selected: {
                light: 'theme-propertyA-defaultAppearance-selectedValue-light',
                dark: 'theme-propertyA-defaultAppearance-selectedValue-dark',
            },
            disabled: {
                light: 'theme-propertyA-defaultAppearance-disabledValue-light',
                dark: 'theme-propertyA-defaultAppearance-disabledValue-dark',
            },
        },
    },
    propertyC: {
        appearanceA: {
            default: {
                light: 'theme-appearanceB-propertyA-defaultValue-light',
                dark: 'theme-appearanceB-propertyA-defaultValue-dark',
            },
        },
    },
};
describe('applyPropertyStyle', function () {
    it("should return 'initial' if the property is not defined.", function () {
        return expect(applyPropertyStyle('not-a-property', {}, themeDefinitions)).toBe('initial');
    });
    it('should return the fallback value if there is no default value.', function () {
        return expect(applyPropertyStyle('propertyB', {}, themeDefinitions)).toBe(fallbacks.propertyB);
    });
    it('should use the default appearance if the appearance is not defined.', function () {
        return expect(applyPropertyStyle('propertyA', { appearance: 'not-an-appearance' }, themeDefinitions)).toBe(themeDefinitions.propertyA.default.default.light);
    });
    it('should use the default value if the state value is not defined.', function () {
        return expect(applyPropertyStyle('propertyA', { appearance: 'default', state: 'is-selected' }, themeDefinitions)).toBe(themeDefinitions.propertyA.default.default.light);
    });
});
describe('mapAttributesToState', function () {
    it("should return the 'hover' value when in the hover state.", function () {
        return expect(mapAttributesToState({ isHover: true })).toBe('hover');
    });
    it("should prioritise 'active' state over 'hover' state.", function () {
        return expect(mapAttributesToState({ isActive: true, isHover: true })).toBe('active');
    });
    it("should prioritise 'selected' state over 'active' and 'hover' states.", function () {
        return expect(mapAttributesToState({ isActive: true, isHover: true, isSelected: true })).toBe('selected');
    });
    it("should prioritise 'disabled' state over all other states.", function () {
        return expect(mapAttributesToState({
            isDisabled: true,
            isActive: true,
            isHover: true,
            isSelected: true,
        })).toBe('disabled');
    });
});
//# sourceMappingURL=testApplyPropertyStyle.js.map