// @flow
import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const SkeletonGlobalPrimaryIconOuter = styled.div`
  margin-bottom: ${math.multiply(gridSize, 1.5)}px;
`;

SkeletonGlobalPrimaryIconOuter.displayName = 'SkeletonGlobalPrimaryIconOuter';
export default SkeletonGlobalPrimaryIconOuter;
