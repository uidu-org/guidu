// @flow
import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const SkeletonContainerItemText = styled.div`
  height: ${math.multiply(gridSize, 2.5)}px;
  background-color: currentColor;
  border-radius: ${math.divide(gridSize, 2)}px;
  opacity: 0.15;
  margin-left: ${gridSize() * 3}px;
  width: ${props => props.textWidth || `${gridSize() * 17}px`};
`;

SkeletonContainerItemText.displayName = 'SkeletonContainerItemText';
export default SkeletonContainerItemText;
