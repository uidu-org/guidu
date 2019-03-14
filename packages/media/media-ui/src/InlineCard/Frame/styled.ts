import { AnchorHTMLAttributes, ComponentClass } from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import { borderRadius as akBorderRadius } from '@atlaskit/theme';

export interface WrapperProps {
  isSelected?: boolean;
  isInteractive?: boolean;
  withoutBackground?: boolean;
}

const selected = `
  cursor: pointer;
  box-shadow: 0 0 0 2px ${colors.B100};
  outline: none;
  &, :hover, :focus, :active {
    text-decoration: none;
  }
`;

const isInteractive = ({ isInteractive }: WrapperProps) => {
  if (isInteractive) {
    return `
      cursor: pointer;
      :hover {
        background-color: ${colors.N40A};
        text-decoration: none;
      }
      :active {
        background-color: ${colors.B50};
        text-decoration: none;
      }
      :focus {
        ${selected}
        text-decoration: none;
      }
    `;
  } else {
    return '';
  }
};

const background = ({ withoutBackground }: WrapperProps) => {
  return withoutBackground ? `` : `background-color: ${colors.N30A};`;
};

const isSelected = ({ isSelected }: WrapperProps) => {
  if (isSelected) {
    return selected;
  } else {
    return '';
  }
};

export const Wrapper: ComponentClass<
  AnchorHTMLAttributes<{}> & WrapperProps
> = styled.a`
  line-height: ${16 / 14};
  margin: 0px 2px;
  padding: 2px;
  border-radius: ${akBorderRadius()}px;
  user-select: none;
  ${background};
  ${isInteractive}
  ${isSelected};
`;
