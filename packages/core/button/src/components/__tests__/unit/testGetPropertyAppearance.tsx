import { getPropertyAppearance } from '../../../styled/getButtonStyles';

const themeDefinitions = {
  fallbacks: {
    propertyA: 'fallback-propertyA',
    propertyB: 'fallback-propertyB',
  },

  theme: {
    default: {
      propertyA: {
        default: 'theme-defaultAppearance-propertyA-defaultValue',
        hover: 'theme-defaultAppearance-propertyA-hoverValue',
        active: 'theme-defaultAppearance-propertyA-activeValue',
        selected: 'theme-defaultAppearance-propertyA-selectedValue',
        disabled: 'theme-defaultAppearance-propertyA-disabledValue',
      },
    },
    appearanceB: {
      propertyA: {
        default: 'theme-appearanceB-propertyA-defaultValue',
      },
    },
  },
};

const { fallbacks, theme } = themeDefinitions;

describe('getPropertyAppearance', () => {
  it("should return 'initial' if the property is not defined.", () =>
    expect(getPropertyAppearance('not-a-property', {}, themeDefinitions)).toBe(
      'initial',
    ));

  it('should return the fallback value if there is no default value.', () =>
    expect(getPropertyAppearance('propertyB', {}, themeDefinitions)).toBe(
      fallbacks.propertyB,
    ));

  it('should use the default appearance if the appearance is not defined.', () =>
    expect(
      getPropertyAppearance(
        'propertyA',
        // @ts-ignore
        { theme: 'themeB', appearance: 'not-an-appearance' },
        themeDefinitions,
      ),
    ).toBe(theme.default.propertyA.default));

  it("should return the 'hover' value when in the hover state.", () =>
    expect(
      getPropertyAppearance('propertyA', { isHover: true }, themeDefinitions),
    ).toBe(theme.default.propertyA.hover));

  it("should prioritise 'active' state over 'hover' state.", () =>
    expect(
      getPropertyAppearance(
        'propertyA',
        { isActive: true, isHover: true },
        themeDefinitions,
      ),
    ).toBe(theme.default.propertyA.active));

  it("should prioritise 'selected' state over 'active' and 'hover' states.", () =>
    expect(
      getPropertyAppearance(
        'propertyA',
        { isActive: true, isHover: true, isSelected: true },
        themeDefinitions,
      ),
    ).toBe(theme.default.propertyA.selected));

  it("should prioritise 'disabled' state over all other states.", () =>
    expect(
      getPropertyAppearance(
        'propertyA',
        { disabled: true, isActive: true, isHover: true, isSelected: true },
        themeDefinitions,
      ),
    ).toBe(theme.default.propertyA.disabled));

  it('should use the default value if the state value is not defined.', () =>
    expect(
      getPropertyAppearance(
        'propertyA',
        // @ts-ignore
        { appearance: 'appearanceB', isSelected: true },
        themeDefinitions,
      ),
    ).toBe(theme.appearanceB.propertyA.default));
});
