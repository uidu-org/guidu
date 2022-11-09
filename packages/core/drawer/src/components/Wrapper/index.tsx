import { layers } from '@uidu/theme';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

const widths = {
  full: tw`w-screen`,
  extended: tw`[width:95vw]`,
  wide: tw`[width:95vw] lg:[width:75vw]`,
  medium: tw`[width:95vw] lg:[width:60vw]`,
  narrow: tw`[width:95vw] md:[width:45vw] lg:[width:35vw]`,
};

const heights = {
  full: tw`h-screen`,
  extended: tw`[height:95vh]`,
  wide: tw`[height:95vw] lg:[height:75vw]`,
  medium: tw`[height:95vw] lg:[height:60vw]`,
  narrow: tw`[height:95vw] md:[height:45vw] lg:[height:35vw]`,
};

const positionAndSizes = (size, origin) => {
  if (origin === 'left' || origin === 'right') {
    return css`
      ${[origin]}: 0;
      top: 0;
      height: 100%;
      max-width: ${size === 'full' ? '100vw' : '90vw'};
      ${widths[size]}
    `;
  } else {
    return css`
      ${[origin]}: 0;
      left: 0;
      width: 100%;
      max-height: ${size === 'full' ? '100vh' : '90vh'};
      ${heights[size]}
    `;
  }
};

export default styled.div<{
  children;
  shouldUnmountOnExit;
  origin;
  size;
  isStacked;
}>`
  background-color: rgb(var(--body-primary-bg));
  z-index: ${({ isStacked }) =>
    isStacked ? layers.blanket() + 2 : layers.blanket() + 1}};
  ${({ size, origin }) => positionAndSizes(size, origin)};
  ${tw`fixed flex overflow-hidden`}
`;
