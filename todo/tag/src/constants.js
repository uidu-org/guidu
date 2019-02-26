// @flow
import { gridSize, themed, colors } from '@atlaskit/theme';

export const focusRingColor = themed({ light: colors.B100, dark: colors.B75 });
export const tagHeightUnitless = 2.5 * gridSize();
export const tagHeight = `${tagHeightUnitless}px`;
export const buttonWidthUnitless = tagHeightUnitless; // button should be square
export const buttonWidth = tagHeight; // button should be square
export const maxWidthUnitless = 25 * gridSize();
export const maxWidth = `${maxWidthUnitless}px`;
export const maxTextWidthUnitless = maxWidthUnitless - tagHeightUnitless;
export const maxTextWidth = `${maxTextWidthUnitless}px`;
