// @ts-ignore
import { colors, withTheme } from '@uidu/theme';
import styled from 'styled-components';
import { SizeType } from '../types';
import { BORDER_WIDTH } from './constants';

interface OuterProps {
  size?: SizeType;
  bgColor?: string | (() => unknown);
}

export const Outer = withTheme(styled.span<OuterProps>`
  align-content: center;
  align-items: center;
  background-color: ${props => props.bgColor || colors.background};
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  overflow: hidden;
  padding: ${({ size }) =>
    (size && BORDER_WIDTH[size]) || BORDER_WIDTH.medium}px;
  width: 100%;
`);

export const Inner = styled.span`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;
