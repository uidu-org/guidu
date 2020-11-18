import { N100 } from '@uidu/theme/colors';
import { gridSize } from '@uidu/theme/constants';
import styled from 'styled-components';

const ThemeColor = {
  text: N100,
};

const Separator = styled.div`
  color: ${ThemeColor.text};
  flex-shrink: 0;
  padding: 0 ${gridSize() / 2}px;
  text-align: center;
  width: auto;
`;

Separator.displayName = 'Separator';

export default Separator;
