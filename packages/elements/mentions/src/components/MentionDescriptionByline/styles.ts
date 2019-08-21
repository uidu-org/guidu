import { colors } from '@uidu/theme';
import styled from 'styled-components';

export const DescriptionBylineStyle = styled.span`
  color: ${colors.N100};
  font-size: 12px;

  margin-top: 2px;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
