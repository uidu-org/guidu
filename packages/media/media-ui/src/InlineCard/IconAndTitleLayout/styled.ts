import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';

export interface IconTitleWrapperProps {
  hasIcon: boolean;
}

export const IconTitleWrapper: ComponentClass<
  HTMLAttributes<{}> & IconTitleWrapperProps
> = styled.span`
  position: relative;
  ${(props: IconTitleWrapperProps) => props.hasIcon && `padding-left: 20px;`}
`;

export const OtherWrapper: ComponentClass<HTMLAttributes<{}>> = styled.span`
  margin-left: 4px;
  display: inline-block;
  vertical-align: text-bottom;
`;
