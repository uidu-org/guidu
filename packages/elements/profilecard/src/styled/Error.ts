import { gridSize } from '@uidu/theme/constants';
import { multiply } from '@uidu/theme/math';
import styled from 'styled-components';
import {
  errorIconColor,
  errorTextColor,
  errorTitleColor,
} from '../styled/constants';

export const ErrorWrapper = styled.div`
  text-align: center;
  padding: ${multiply(gridSize, 3)}px;
  color: ${errorIconColor};
`;

export const ErrorTitle = styled.p`
  color: ${errorTitleColor};
  line-height: ${multiply(gridSize, 3)}px;
  margin: ${gridSize}px 0;
`;

export const ErrorText = styled.span`
  color: ${errorTextColor};
`;
