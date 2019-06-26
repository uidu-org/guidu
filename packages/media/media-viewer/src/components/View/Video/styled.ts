import { colors } from '@uidu/theme';
import styled from 'styled-components';

export const Wrapper = styled.div<{ width: number }>`
  background-color: black;
  line-height: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ width }) => width};
  position: relative;
  text-align: center;
  height: 100vh;
  display: flex;
`;

export const Footer = styled.footer<{ interactionIsIdle: boolean }>`
  align-items: center;
  bottom: 0;
  display: flex;
  left: 0;
  opacity: ${({ interactionIsIdle }) => (interactionIsIdle ? 0 : 1)};
  padding: 10;
  padding-right: 15;
  position: absolute;
  right: 0;
  transition: opacity 300ms;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.44));
`;

export const Button = styled.button`
  background: 0;
  border: 0;
  color: white;
  cursor: pointer;
  height: 32px;
  margin-right: 10;
  outline: 0;
  padding: 0;
  opacity: 0.66;
  width: 32px;

  &:hover {
    opacity: 1;
  }

  &:active {
    color: ${colors.primary};
  }
`;
