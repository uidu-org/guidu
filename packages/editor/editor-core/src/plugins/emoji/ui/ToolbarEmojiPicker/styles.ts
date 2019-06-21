import { gridSize } from '@uidu/theme';
import styled from 'styled-components';

export const OuterContainer = styled.span<{ width?: 'small' | 'large' }>`
  position: relative;
  margin-right: ${({ width }) =>
    !width || width === 'large' ? 0 : gridSize()}px;
  > div {
    display: flex;
  }
`;
