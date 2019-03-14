/* tslint:disable:variable-name */

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass, LiHTMLAttributes } from 'react';
import { colors } from '@atlaskit/theme';

export interface WrapperProps {
  isActive: boolean;
}

export const Wrapper: ComponentClass<
  LiHTMLAttributes<{}> & WrapperProps
> = styled.li`
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

export const ServiceIcon: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

export const ServiceName: ComponentClass<HTMLAttributes<{}>> = styled.div`
  font-size: 14px;
  position: relative;
  margin-left: 10px;
  top: -1px;
  display: inline-block;
`;
