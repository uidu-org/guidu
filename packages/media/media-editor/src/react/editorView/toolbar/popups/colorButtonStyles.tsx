import styled from 'styled-components';
import { colors, borderRadius } from '@uidu/theme';

export const ColorSample = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 4px;
  border-radius: ${borderRadius()};
`;

export const CheckArea = styled.div`
  color: ${colors.N0};
`;
