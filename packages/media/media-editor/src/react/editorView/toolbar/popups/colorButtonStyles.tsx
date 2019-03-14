// tslint:disable:variable-name

import styled from 'styled-components';

import { HTMLAttributes, ComponentClass } from 'react';
import { colors, borderRadius } from '@atlaskit/theme';

export const ColorSample: ComponentClass<HTMLAttributes<{}>> = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin: 4px;
  border-radius: ${borderRadius()};
`;

export const CheckArea: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${colors.N0};
`;
