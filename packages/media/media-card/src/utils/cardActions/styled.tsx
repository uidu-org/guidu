import styled from 'styled-components';
import { colors } from '@uidu/theme';
import { borderRadius, size, center } from '@uidu/media-ui';
import { Root } from '../../styles';

export const Wrapper = styled(Root)`
  display: flex;
  position: relative;
  line-height: 0;
`;

export const CardActionButton = styled.div`
  ${center} ${borderRadius} ${size(26)} color: ${colors.N500};

  &:hover {
    cursor: pointer;
    background-color: rgba(9, 30, 66, 0.06);
  }
`;
