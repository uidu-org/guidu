// tslint:disable:variable-name

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';

export const Container: ComponentClass<HTMLAttributes<{}>> = styled.div`
  width: 32px;
  height: 32px;
  padding: 1px;
  box-sizing: border-box;
`;

export const HoverArea: ComponentClass<HTMLAttributes<{}>> = styled.div`
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  padding: 1px;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid ${colors.N30A};
  }
`;
export interface AreaProps {
  isSelected: boolean;
}
export const MainArea: ComponentClass<
  HTMLAttributes<{}> & AreaProps
> = styled.div`
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-radius: 15px;
  background-color: ${(props: AreaProps) =>
    props.isSelected ? colors.N500 : colors.N30A};
`;

export const FrontArea: ComponentClass<
  HTMLAttributes<{}> & AreaProps
> = styled.div`
  box-sizing: border-box;
  background-color: ${(props: AreaProps) =>
    props.isSelected ? colors.N0 : colors.N500};
`;
