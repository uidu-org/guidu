import styled, { css } from 'styled-components';

import { HTMLAttributes, ComponentClass, AnchorHTMLAttributes } from 'react';

import { colors, fontFamily } from '@atlaskit/theme';
import { borderRadius, size, ellipsis } from '../../mixins';

const wrapperPadding = 8;
export const className = 'media-card-frame';

export const cardShadow = `
  box-shadow: 0 0 1px 0 rgba(23, 43, 77, 0.24);`;

export interface WrapperProps {
  minWidth?: number;
  maxWidth?: number;
  isInteractive?: boolean;
  isSelected?: boolean;
}

function minWidth({ minWidth }: WrapperProps) {
  if (minWidth) {
    return `min-width: ${minWidth}px;`;
  } else {
    return '';
  }
}

function maxWidth({ maxWidth }: WrapperProps) {
  if (maxWidth) {
    return `max-width: ${maxWidth}px;`;
  } else {
    return '';
  }
}

function interactive({ isInteractive }: WrapperProps) {
  if (isInteractive) {
    return `
      cursor: pointer;
      &:hover {
        background-color: ${colors.N30};
      }
      &:active {
        background-color: ${colors.B50};
      }
    `;
  } else {
    return '';
  }
}

function selected({ isSelected }: WrapperProps) {
  return isSelected
    ? `&::after {
        cursor: pointer;
        box-shadow: 0 0 0 2px ${colors.B100};
        content: '';
        outline: none;
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
      }`
    : '';
}

const wrapperStyles = css`
  ${borderRadius} ${minWidth} ${maxWidth} ${interactive} display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: ${fontFamily()};
  padding: 0 ${wrapperPadding}px ${wrapperPadding}px ${wrapperPadding}px;
  width: 100%;
  user-select: none;
  background-color: ${colors.N20};
  line-height: initial;
  transition: background 0.3s;
  position: relative;
  ${selected}
`;

// export interface ContentProps {
//   maxWidth?: number;
// }

export const LinkWrapper: ComponentClass<
  AnchorHTMLAttributes<{}> & WrapperProps
> = styled.a`
  ${wrapperStyles} &:hover {
    text-decoration: none;
  }
`;

export const Wrapper: ComponentClass<
  HTMLAttributes<{}> & WrapperProps
> = styled.div`
  ${wrapperStyles};
`;

export const Header: ComponentClass<HTMLAttributes<{}>> = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  color: ${colors.N300};
`;

export interface PlaceholderProps {
  isPlaceholder: boolean;
}

export const IconWrapper: ComponentClass<
  HTMLAttributes<{}> & PlaceholderProps
> = styled.div`
  ${borderRadius} ${size(16)} ${({ isPlaceholder }: PlaceholderProps) => {
  if (isPlaceholder) {
    return `
      background-color: ${colors.N30};
    `;
  } else {
    return '';
  }
}} margin-right: 4px;
`;

export const TextWrapper: ComponentClass<
  HTMLAttributes<{}> & PlaceholderProps
> = styled.div`
  ${({ isPlaceholder }: PlaceholderProps) => {
    if (isPlaceholder) {
      return `
        ${borderRadius}
        width: 125px;
        height: 12px;
        background-color: ${colors.N30};
      `;
    } else {
      return '';
    }
  }} color: ${colors.N300};
  font-size: 12px;
  line-height: 16px;
  ${ellipsis('none')};
`;

export interface ContentProps {
  isInteractive: boolean;
}

export const Content: ComponentClass<
  HTMLAttributes<{}> & ContentProps
> = styled.div`
  position: relative;

  ${borderRadius} ${cardShadow} background-color: white;
  transition: box-shadow 0.3s;

  ${({ isInteractive }: ContentProps) => {
    if (isInteractive) {
      return `
          .${className}:hover & {
            box-shadow: 0 4px 8px -2px rgba(23, 43, 77, 0.32),
              0 0 1px rgba(23, 43, 77, 0.25);
          }
        `;
    } else {
      return '';
    }
  }};
`;
