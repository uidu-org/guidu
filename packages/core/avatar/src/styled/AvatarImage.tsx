import { background, DN100, N50 } from '@uidu/theme/colors';
import { themed, withTheme } from '@uidu/theme/components';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from '../theme';
import { AppearanceType, SizeType } from '../types';

export const ShapeGroup = withTheme(styled.g`
  & circle,
  & rect {
    fill: ${themed({ light: N50, dark: DN100 })};
  }
  & g {
    fill: ${background};
  }
`);

type SlotProps = {
  appearance: AppearanceType;
  isLoading: boolean;
  size: SizeType;
  role: string;
  label?: string;
  backgroundImage?: string;
};

export const Slot = ({
  isLoading,
  appearance,
  size,
  backgroundImage,
  label,
  role,
}: SlotProps) => (
  <Theme.Consumer appearance={appearance} isLoading={isLoading} size={size}>
    {({ backgroundColor, borderRadius }) => {
      return (
        <span
          tw="bg-cover bg-center bg-no-repeat flex h-full w-full"
          style={{
            backgroundColor,
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : undefined,
            borderRadius,
            flex: '1 1 100%',
          }}
          role={role}
          aria-label={label}
        />
      );
    }}
  </Theme.Consumer>
);

interface SvgProps {
  appearance: AppearanceType;
  isLoading: boolean;
  size: SizeType;
  children: ReactNode;
  viewBox?: string;
  version?: string;
  xmlns?: string;
  role?: string;
  'aria-label'?: string;
}

export const Svg = ({
  appearance,
  size,
  children,
  isLoading,
  ...otherProps
}: SvgProps) => (
  <Theme.Consumer appearance={appearance} isLoading={isLoading} size={size}>
    {({ backgroundColor, borderRadius }) => {
      return (
        <svg
          tw="h-full w-full"
          style={{
            backgroundColor,
            borderRadius,
          }}
          {...otherProps}
        >
          {children}
        </svg>
      );
    }}
  </Theme.Consumer>
);
