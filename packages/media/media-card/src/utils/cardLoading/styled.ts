/* tslint:disable:variable-name */
import styled, { keyframes } from 'styled-components';
import { center } from '@uidu/media-ui';
import { colors, themed } from '@uidu/theme';
import { CardDimensions } from '../..';

export const blinkLoadingAnimation = keyframes`
  0%{
    opacity: 1;
  }

  50%{
    opacity: 0.6;
  }

  100%{
    opacity: 1;
  }
`;

export interface WrapperProps {
  dimensions: CardDimensions;
}

export const Wrapper = styled.div`
  ${center} background: ${themed({ light: colors.N20, dark: colors.DN50 })};
  color: ${themed({ light: colors.N50, dark: colors.DN100 })};
  border-radius: inherit;
  max-height: 100%;
  max-width: 100%;

  ${(props: WrapperProps) => {
    return `
      width: ${props.dimensions.width};
      height: ${props.dimensions.height};
    `;
  }}
  > span {
    animation: ${blinkLoadingAnimation} 0.8s infinite;
  }
`;
