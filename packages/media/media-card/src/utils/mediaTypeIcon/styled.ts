/* tslint:disable:variable-name */

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@uidu/theme';

const typeToColorMap: any = {
  image: colors.Y200,
  audio: colors.P200,
  video: '#ff7143',
  doc: colors.B300,
  unknown: '#3dc7dc',
};

export interface IconWrapperProps {
  type: string;
}

export const IconWrapper: ComponentClass<
  HTMLAttributes<{}> & IconWrapperProps
> = styled.div`
  display: inline-flex;
  color: ${({ type }: IconWrapperProps) =>
    typeToColorMap[type] || typeToColorMap.unknown};
`;
