import styled from 'styled-components';
import { colors } from '@uidu/theme';
import { borderRadius, size } from '../../mixins';

export const IconBackground = styled.div`
  ${borderRadius}
  ${size(24)}
  background-color: ${colors.B200};
`;
