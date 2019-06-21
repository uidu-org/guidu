import { borderRadius, colors } from '@uidu/theme';
import styled, { css } from 'styled-components';
import { dropShadow } from '../styles';

export const Container = styled.div<{ height?: number; innerRef?: any }>`
  border-radius: ${borderRadius()}px;
  ${dropShadow} display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 8px;
  background-color: ${colors.N0};
  ${({ height }: { height?: number }) =>
    height
      ? css`
          height: ${height}px;
        `
      : ''};
`;
