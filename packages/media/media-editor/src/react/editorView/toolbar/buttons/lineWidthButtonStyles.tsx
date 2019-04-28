import styled from 'styled-components';
import { colors } from '@uidu/theme';

export interface AreaProps {
  isActive: boolean;
}

export const MainArea = styled.div<AreaProps>`
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border-radius: 15px;
  background-color: ${(props: AreaProps) =>
    props.isActive ? colors.N500 : colors.N30};
`;

export const FrontArea = styled.div<AreaProps>`
  box-sizing: border-box;
  background-color: ${(props: AreaProps) =>
    props.isActive ? colors.N0 : colors.N500};
`;
