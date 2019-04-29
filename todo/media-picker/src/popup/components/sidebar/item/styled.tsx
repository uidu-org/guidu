/* tslint:disable:variable-name */

import styled from 'styled-components';

import { colors } from '@uidu/theme';

export interface WrapperProps {
  isActive: boolean;
}

export const Wrapper = styled.li<WrapperProps>`
  color: ${({ isActive }: WrapperProps) =>
    isActive ? colors.B400 : colors.N500};
  padding: 6px 25px;
  list-style-type: none;
  opacity: 1;

  ${({ isActive }: WrapperProps) => (isActive ? '' : 'cursor: pointer')};
  &:hover {
    ${({ isActive }: WrapperProps) =>
      isActive ? '' : 'background-color: #E5E8EC'};
  }
`;

export const ServiceIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const ServiceName = styled.div`
  font-size: 14px;
  position: relative;
  margin-left: 10px;
  top: -1px;
  display: inline-block;
`;
