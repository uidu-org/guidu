// @flow
import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme';

const SkeletonContainerHeaderWrapper = styled.div`
  margin-bottom: ${gridSize() * 2}px;
`;

SkeletonContainerHeaderWrapper.displayName = 'SkeletonContainerHeaderWrapper';
export default SkeletonContainerHeaderWrapper;
