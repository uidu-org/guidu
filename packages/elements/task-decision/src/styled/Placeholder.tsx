import { colors, gridSize } from '@uidu/theme';
import styled from 'styled-components';

export const Placeholder = styled.span`
  margin: 0 0 0 ${gridSize() * 3}px;
  position: absolute;
  color: ${colors.N80};
  pointer-events: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100% - 50px);
`;
