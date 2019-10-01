import { gridSize } from '@uidu/theme';
import styled from 'styled-components';

const HORIZONTAL_SPACING = `${gridSize() / 2}px`;

export default styled.span<{ maxWidth?: number | string }>`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0 ${HORIZONTAL_SPACING};
  max-width: ${props =>
    typeof props.maxWidth === 'number'
      ? `${props.maxWidth}px`
      : props.maxWidth};
  width: 100%;
`;
