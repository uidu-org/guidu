import { css } from 'styled-components';
import { borderRadius, fontSize, gridSize, math } from '@atlaskit/theme';
import themeDefinitions from './themeDefinitions';
import { themeNamespace } from '../theme';
import getButtonProps from '../components/getButtonProps';

// TODO: Type correctly when @atlaskit/theme is typescript

const getProvidedTheme = ({ theme }: StyleProps) =>
  (theme && theme[themeNamespace]) || {};

type StyleProps = Partial<ReturnType<typeof getButtonProps>> & {
  theme?: any;
};

const getAppearanceProperty = (
  property: string,
  appearance: string | undefined,
  providedTheme: any,
  inBuiltTheme: any,
) => {
  const defaultAppearanceStyles = inBuiltTheme.default;

  if (!appearance) {
    return defaultAppearanceStyles[property];
  }

  const providedAppearanceStyles = providedTheme[appearance];
  const inBuiltAppearanceStyles = inBuiltTheme[appearance];

  return (
    (providedAppearanceStyles && providedAppearanceStyles[property]) ||
    (inBuiltAppearanceStyles && inBuiltAppearanceStyles[property]) ||
    defaultAppearanceStyles[property]
  );
};

const getState = ({
  disabled,
  isActive,
  isFocus,
  isHover,
  isSelected,
}: StyleProps) => {
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

export const getPropertyAppearance = (
  property: string,
  props: StyleProps = {},
  definitions: any = themeDefinitions,
) => {
  const { appearance } = props;
  const { fallbacks, theme: inBuiltTheme } = definitions;
  const providedTheme = getProvidedTheme(props);

  const propertyStyles = getAppearanceProperty(
    property,
    appearance,
    providedTheme,
    inBuiltTheme,
  );

  if (!propertyStyles) {
    return fallbacks[property] || 'initial';
  }

  const state = getState(props);

  return propertyStyles[state] || propertyStyles.default || fallbacks[property];
};

export default function getButtonStyles(props: StyleProps) {
  // $FlowFixMe - should be fixed when theme work is done
  const baseSize = fontSize(props);
  const buttonHeight = `${math.divide(math.multiply(gridSize, 4), baseSize)(
    props,
  )}em`;
  const compactButtonHeight = `${math.divide(
    math.multiply(gridSize, 3),
    baseSize,
  )(props)}em`;

  /**
   * Variable styles
   */
  let cursor = 'default';
  let height = buttonHeight;
  let lineHeight = buttonHeight;
  let outline = 'none';
  // $FlowFixMe - should be fixed when theme work is done
  let padding = `0 ${gridSize(props)}px`;
  let transitionDuration = '0.1s, 0.15s';
  let transition =
    'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';
  let verticalAlign = 'middle';
  let width = 'auto';

  /**
   * Appearance + Theme styles
   */
  const background = getPropertyAppearance('background', props);
  const color = getPropertyAppearance('color', props);
  const boxShadowColor = getPropertyAppearance('boxShadowColor', props);
  const boxShadow = boxShadowColor
    ? css`
        box-shadow: 0 0 0 2px ${boxShadowColor};
      `
    : null;
  const textDecoration = getPropertyAppearance('textDecoration', props);

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
  const isLoadingStyles = (p: StyleProps) =>
    p.isLoading ? 'pointer-events: none;' : null;

  // Fit to parent width
  if (props.fit) {
    width = '100%';
  }

  /* Note use of !important to override the ThemeReset on anchor tag styles */

  return css<StyleProps>`
    align-items: baseline;
    background: ${background};
    border-radius: ${borderRadius}px;
    border-width: 0;
    box-sizing: border-box;
    color: ${color} !important;
    cursor: ${cursor};
    display: inline-flex;
    font-size: inherit;
    font-style: normal;
    height: ${height};
    line-height: ${lineHeight};
    margin: 0;
    max-width: 100%;
    outline: ${outline} !important;
    padding: ${padding};
    text-align: center;
    text-decoration: ${textDecoration};
    transition: ${transition};
    transition-duration: ${transitionDuration};
    vertical-align: ${verticalAlign};
    white-space: nowrap;
    width: ${width};
    ${boxShadow} &::-moz-focus-inner {
      border: 0;
      margin: 0;
      padding: 0;
    }
    ${isLoadingStyles};
  `;
}
