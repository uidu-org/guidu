import styled from 'styled-components';
import { colors } from '@uidu/theme';

export const ToolbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 64px;
`;

export const CenterButtons = styled.div`
  cursor: pointer;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const VerticalLine = styled.div`
  width: 1px;
  background: ${colors.N30A};
  height: 32px;
`;
