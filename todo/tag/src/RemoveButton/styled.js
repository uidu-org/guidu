// @flow
import styled from 'styled-components';
import { colors, borderRadius, themed } from '@atlaskit/theme';
import { buttonWidthUnitless, focusRingColor } from '../constants';

const focusColor = themed({ light: colors.R300, dark: colors.R200 });

// NOTE:
// "-moz-focus-inner" removes some inbuilt padding that Firefox adds (taken from reduced-ui-pack)
// the focus ring is red unless combined with hover, then uses default blue
export const Button = styled.button`
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  border-radius: ${({ isRounded }) =>
    isRounded ? `${buttonWidthUnitless / 2}px` : `${borderRadius()}px`};
  color: ${colors.N500};
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;

  &::-moz-focus-inner {
    border: 0;
    margin: 0;
    padding: 0;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${focusColor};
    outline: none;
  }

  &:hover {
    color: ${colors.R500};

    &:focus {
      box-shadow: 0 0 0 2px ${focusRingColor};
      outline: none;
    }
  }
`;
