// @flow

import { colors, gridSize } from '@atlaskit/theme';
import type { AppearanceType, PresenceType, SizeType } from '../types';

type Dimensions = {
  height: string,
  width: string,
};

type Layout = {
  // We have to specify all corners as optional because either bottom or top
  // and left or right could be specified.
  bottom?: string,
  left?: string,
  right?: string,
  top?: string,

  // Must be specified every time.
  height: string,
  width: string,
};

type Sizes = {
  xsmall: number,
  small: number,
  medium: number,
  large: number,
  xlarge: number,
  xxlarge: number,
};

const gridSizeValue: number = gridSize();

const AVATAR_SIZES: Sizes = {
  xsmall: gridSizeValue * 2,
  small: gridSizeValue * 3,
  medium: gridSizeValue * 4,
  large: gridSizeValue * 5,
  xlarge: gridSizeValue * 12,
  xxlarge: gridSizeValue * 16,
};

// border radius only applies to "square" avatars
const AVATAR_RADIUS: Sizes = {
  xsmall: 2,
  small: 2,
  medium: 3,
  large: 3,
  xlarge: 6,
  xxlarge: 12,
};

const BORDER_WIDTH: Sizes = {
  xsmall: 2,
  small: 2,
  medium: 2,
  large: 2,
  xlarge: 2,
  xxlarge: 2,
};

const ICON_SIZES: Sizes = {
  xsmall: 0,
  small: 12,
  medium: 14,
  large: 15,
  xlarge: 18,
  xxlarge: 0,
};

const ICON_OFFSET: Sizes = {
  xsmall: 0,
  small: 0,
  medium: 0,
  large: 1,
  xlarge: 7,
  xxlarge: 0,
};

const SQUARE_ICON_OFFSET: Sizes = {
  xsmall: 0,
  small: 0,
  medium: 0,
  large: 0,
  xlarge: 1,
  xxlarge: 0,
};

function getBackgroundColor(props: {
  isLoading: boolean,
  mode: 'dark' | 'light',
}): string {
  const backgroundColors = {
    light: colors.N40,
    dark: colors.DN50,
  };
  return props.isLoading ? backgroundColors[props.mode] : 'transparent';
}

function getBorderRadius(props: {
  appearance: AppearanceType,
  includeBorderWidth: boolean,
  size: SizeType,
}): string {
  const borderWidth = props.includeBorderWidth ? BORDER_WIDTH[props.size] : 0;
  const borderRadius =
    props.appearance === 'circle'
      ? '50%'
      : `${AVATAR_RADIUS[props.size] + borderWidth}px`;
  return borderRadius;
}

function getDimensions(props: ThemeAvatarProps): Dimensions {
  const borderWidth: number = props.includeBorderWidth
    ? BORDER_WIDTH[props.size] * 2
    : 0;
  const size: number = AVATAR_SIZES[props.size] + borderWidth;
  const width = `${size}px`;
  const height = width;
  return { height, width };
}

const getPresenceLayout = ({ appearance, size }: ThemeAvatarProps): Layout => {
  const presencePosition =
    appearance === 'square' ? -(BORDER_WIDTH[size] * 2) : ICON_OFFSET[size];
  const presenceSize = ICON_SIZES[size];

  return {
    bottom: `${presencePosition}px`,
    height: `${presenceSize}px`,
    right: `${presencePosition}px`,
    width: `${presenceSize}px`,
  };
};

const getStatusLayout = ({ appearance, size }: ThemeAvatarProps): Layout => {
  const statusPosition =
    appearance === 'square' ? SQUARE_ICON_OFFSET[size] : ICON_OFFSET[size];
  const statusSize = ICON_SIZES[size];

  return {
    height: `${statusSize}px`,
    right: `${statusPosition}px`,
    top: `${statusPosition}px`,
    width: `${statusSize}px`,
  };
};

type ThemeAvatarProps = {
  appearance: AppearanceType,
  includeBorderWidth: boolean,
  isLoading: boolean,
  presence: PresenceType,
  size: SizeType,
};

export type ThemeProps = {
  avatar?: ThemeAvatarProps => {
    backgroundColor: string,
    borderRadius: string,
    dimensions: Dimensions,
    presence: Layout,
    status: Layout,
  },
  mode?: 'dark' | 'light',
};

export function theme(parent: ThemeProps): ThemeProps {
  const mode = parent.mode || 'light';
  return {
    avatar(props) {
      return {
        backgroundColor: getBackgroundColor({
          isLoading: props.isLoading,
          mode,
        }),
        borderRadius: getBorderRadius(props),
        dimensions: getDimensions(props),
        presence: getPresenceLayout(props),
        status: getStatusLayout(props),
        ...(parent.avatar && parent.avatar(props)),
      };
    },
    mode,
    ...parent,
  };
}
