// @flow
import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const SkeletonContainerHeaderText = styled.div`
  height: ${math.multiply(gridSize, 2.5)}px;
  background-color: currentColor;
  border-radius: ${math.divide(gridSize, 2)}px;
  opacity: 0.3;
  ${props => !props.isAvatarHidden && `margin-left: ${gridSize() * 2}px`};
  width: ${gridSize() * 18}px;
`;

SkeletonContainerHeaderText.displayName = 'SkeletonContainerHeaderText';
export default SkeletonContainerHeaderText;
