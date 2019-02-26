// @flow

import styled from 'styled-components';
import { gridSize, typography } from '@atlaskit/theme';

const Header = styled.h4`
  ${typography.h600()};
  margin-top: 0;
  margin-bottom: ${gridSize() * 2}px;
`;

export default Header;
