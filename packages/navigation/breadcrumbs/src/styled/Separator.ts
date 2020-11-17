import { N100 } from '@uidu/theme/colors';
import { gridSize } from '@uidu/theme/constants';
import styled from 'styled-components';

const ThemeColor = {
  text: N100,
};

const Separator = styled.div`
  color: ${ThemeColor.text};
  flex-shrink: 0;
  padding: 0 ${gridSize}px;
  text-align: center;
  width: ${gridSize * 3}px;
`;

Separator.displayName = 'Separator';

export default Separator;
