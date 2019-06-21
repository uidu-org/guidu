import { colors } from '@uidu/theme';
import styled from 'styled-components';

export const TriggerWrapper = styled.div`
  display: flex;
`;

export const Separator = styled.span`
  background: ${colors.N30};
  width: 1px;
  height: 24px;
  display: inline-block;
  margin: 0 8px;
`;

export const Wrapper = styled.span`
  display: flex;
  align-items: center;
  div {
    display: flex;
  }
`;

export const ExpandIconWrapper = styled.span`
  margin-left: -8px;
`;
