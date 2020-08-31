import { gridSize } from '@uidu/theme/constants';
import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-top: ${gridSize() - 2}px;
  position: absolute;
  right: 0;
  top: 100%;
`;

ButtonsWrapper.displayName = 'ButtonsWrapper';

export default ButtonsWrapper;
