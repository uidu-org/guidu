// @flow

import React, { type Node } from 'react';
import styled from 'styled-components';
import { colors, Theme, themed, withTheme } from '@atlaskit/theme';
import { theme } from '../theme';
import type { AppearanceType, SizeType } from '../types';

export const ShapeGroup = withTheme(styled.g`
  & circle,
  & rect {
    fill: ${themed({ light: colors.N50, dark: colors.DN100 })};
  }
  & g {
    fill: ${colors.background};
  }
`);

type SlotProps = {|
  appearance: AppearanceType,
  isLoading: boolean,
  size: SizeType,
  role: string,
  label: ?string,
  backgroundImage: ?string,
|};

export const Slot = ({
  isLoading,
  appearance,
  size,
  backgroundImage,
  label,
  role,
}: SlotProps) => (
  <Theme theme={theme}>
    {({ avatar }) => {
      const { backgroundColor, borderRadius } = avatar({
        appearance,
        isLoading,
        size,
      });
      return (
        <span
          style={{
            backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius,
            display: 'flex',
            flex: '1 1 100%',
            height: '100%',
            width: '100%',
          }}
          role={role}
          aria-label={label}
        />
      );
    }}
  </Theme>
);

type SvgProps = {
  appearance: AppearanceType,
  isLoading: boolean,
  size: SizeType,
  children: Node,
};

export const Svg = ({
  appearance,
  size,
  children,
  isLoading,
  ...otherProps
}: SvgProps) => (
  <Theme theme={theme}>
    {({ avatar }) => {
      const { backgroundColor, borderRadius } = avatar({
        appearance,
        isLoading,
        size,
      });
      return (
        <svg
          style={{
            backgroundColor,
            borderRadius,
            height: '100%',
            width: '100%',
          }}
          {...otherProps}
        >
          {children}
        </svg>
      );
    }}
  </Theme>
);
