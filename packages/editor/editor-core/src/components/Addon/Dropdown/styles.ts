import { borderRadius, colors } from '@uidu/theme';
import styled from 'styled-components';

export const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: ${borderRadius()}px;
  box-shadow: 0 4px 8px -2px ${colors.N60A}, 0 0 1px ${colors.N60A};
  box-sizing: border-box;
  padding: 4px 0;
`;
