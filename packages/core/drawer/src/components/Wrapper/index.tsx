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
  if (origin == 'left' || origin == 'right') {
    return css`
      ${[origin]}: 0;
      top: 0;
      height: 100vh;
      width: ${widths[size]};
    `;
  } else {
    return css`
      ${[origin]}: 0;
      left: 0;
      width: 100vw;
      height: ${heights[size]};
    `;
  }
};

export default styled.div<{ children; shouldUnmountOnExit; origin; size }>`
  background-color: ${colors.N0};
  display: flex;
  overflow: hidden;
  position: fixed;
  z-index: ${layers.blanket() + 1};
  ${({ size, origin }) => positionAndSizes(size, origin)};
`;
