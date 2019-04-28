import styled from 'styled-components';

export interface IconTitleWrapperProps {
  hasIcon: boolean;
}

export const IconTitleWrapper = styled.span`
  position: relative;
  ${(props: IconTitleWrapperProps) => props.hasIcon && `padding-left: 20px;`}
`;

export const OtherWrapper = styled.span`
  margin-left: 4px;
  display: inline-block;
  vertical-align: text-bottom;
`;
