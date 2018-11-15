// @flow
import styled from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';

const ThemeColor = {
  text: colors.N100,
};

const Separator = styled.div`
  color: ${ThemeColor.text};
  padding-left: ${gridSize}px;
  text-align: center;
  width: ${gridSize}px;
  flex-shrink: 0;
`;

Separator.displayName = 'Separator';

export default Separator;
