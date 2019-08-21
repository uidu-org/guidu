import { borderRadius } from '@uidu/theme';
import styled from 'styled-components';
import { scrollableMaxHeight } from '../../shared-styles';

export const ScrollableStyle = styled.div`
  display: block;
  overflow-x: hidden;
  overflow-y: auto;

  padding: 4px 0;
  margin: 0;

  background: white;
  max-height: ${scrollableMaxHeight};

  border-radius: ${borderRadius()}px;
`;
