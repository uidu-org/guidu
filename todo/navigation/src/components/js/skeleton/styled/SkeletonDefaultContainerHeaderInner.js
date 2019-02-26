// @flow
import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const SkeletonDefaultContainerHeaderInner = styled.div`
  display: flex;
  align-items: center;
  margin: ${props =>
      props.isAvatarHidden ? gridSize() * 2 : math.divide(gridSize, 2)}px
    ${gridSize()}px 0 ${gridSize()}px;
`;

SkeletonDefaultContainerHeaderInner.displayName =
  'SkeletonDefaultContainerHeaderInner';
export default SkeletonDefaultContainerHeaderInner;
