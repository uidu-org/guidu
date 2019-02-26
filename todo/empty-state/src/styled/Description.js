// @flow

import styled from 'styled-components';
import { gridSize, colors } from '@atlaskit/theme';

const Description = styled.p`
  color: ${colors.N800};
  margin-top: 0;
  margin-bottom: ${gridSize() * 3}px;
`;

export default Description;
