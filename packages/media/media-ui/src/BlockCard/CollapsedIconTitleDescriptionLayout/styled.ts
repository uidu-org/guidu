import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { colors } from '@atlaskit/theme';
import { ellipsis } from '../../mixins';

export const Title: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${colors.N800};
  font-size: 14px;
  font-weight: 500;
  line-height: ${16 / 14};
  margin-bottom: 2px;
  ${ellipsis('100%')};
`;

export const Description: ComponentClass<HTMLAttributes<{}>> = styled.div`
  color: ${colors.N300};
  font-size: 12px;
  font-weight: normal;
  line-height: ${16 / 12};
  margin-bottom: 2px;
  ${ellipsis('100%')};
`;
