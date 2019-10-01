import * as React from 'react';
import { borderRadius, colors, themed } from '@uidu/theme';
import styled from 'styled-components';

export type Color = 'grey' | 'red' | 'blue' | 'green' | 'purple' | 'yellow';

export type Props = React.HTMLProps<HTMLSpanElement> & {
  clickable?: boolean;
  color?: Color;
};

type ColoursTuple = [string, string, string];
export const resolveColors = (
  color?: Color,
): { light: ColoursTuple; dark: ColoursTuple } => {
  if (!color || color === 'grey') {
    return {
      light: [colors.N30A, colors.N800, colors.N40],
      dark: [colors.DN70, colors.DN800, colors.DN60],
    };
  }
  const letter = color.toUpperCase().charAt(0);
  const resolvedColors: ColoursTuple = [
    colors[`${letter}50`],
    colors[`${letter}500`],
    colors[`${letter}75`],
  ];
  return {
    light: resolvedColors,
    dark: resolvedColors,
  };
};

/**
 * TODO when update typescript to 2.9+
 * add custom props as Generic Parameter to span instead of casting
 */
export const DateLozenge = styled.span`
  border-radius: ${borderRadius()}px;
  padding: 2px 4px;
  margin: 0 1px;
  position: relative;
  transition: background 0.3s;
  white-space: nowrap;
  cursor: ${(props: Props) => (props.onClick ? 'pointer' : 'unset')};

  ${(props: Props) => {
    const [background, color, hoverBackground]: ColoursTuple = themed(
      resolveColors(props.color),
    )(props);
    return `
      background: ${background};
      color: ${color};
      &:hover {
        background: ${hoverBackground};
      }
    `;
  }};
` as React.ComponentType<Props>;
