import { colors, gridSize, layers } from '@uidu/theme';
import styled, { css } from 'styled-components';

const widths = {
  full: '100vw',
  extended: '95vw',
  narrow: `${45 * gridSize()}px`,
  medium: `${60 * gridSize()}px`,
  wide: `${75 * gridSize()}px`,
};

const heights = {
  full: '100vh',
  extended: '95vh',
  narrow: `${45 * gridSize()}px`,
  medium: `${60 * gridSize()}px`,
  wide: `${75 * gridSize()}px`,
};

const positionAndSizes = (size, origin) => {
  if (origin === 'left' || origin === 'right') {
    return css`
      ${[origin]}: 0;
      top: 0;
      height: 100vh;
      width: ${widths[size]};
      max-width: ${size === 'full' ? '100vw' : '90vw'};
    `;
  } else {
    return css`
      ${[origin]}: 0;
      left: 0;
      width: 100vw;
      height: ${heights[size]};
      max-height: ${size === 'full' ? '100vh' : '90vh'};
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
  background-color: ${colors.N0};
  display: flex;
  overflow: hidden;
  position: fixed;
  z-index: ${({ isStacked }) =>
    isStacked ? layers.blanket() + 2 : layers.blanket() + 1}};
  ${({ size, origin }) => positionAndSizes(size, origin)};
`;
