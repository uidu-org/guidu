import {
  borderRadius,
  colors,
  elevation,
  gridSize,
  layers,
  math,
  themed,
} from '@uidu/theme';
import styled from 'styled-components';

const { N0, DN50, N900, DN600 } = colors;
const { e200 } = elevation;
const { multiply } = math;
const backgroundColor = themed({ light: N0, dark: DN50 });
const textColor = themed({ light: N900, dark: DN600 });

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  background: ${backgroundColor};
  border-radius: ${borderRadius}px;
  box-sizing: content-box; /* do not set this to border-box or it will break the overflow handling */
  color: ${textColor};
  max-height: ${multiply(gridSize, 56)}px;
  max-width: ${multiply(gridSize, 56)}px;
  padding: ${multiply(gridSize, 2)}px ${multiply(gridSize, 3)}px;
  z-index: ${layers.dialog};

  ${e200};

  &:focus {
    outline: none;
  }
`;
