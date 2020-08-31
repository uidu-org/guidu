import { fontSize, gridSize } from '@uidu/theme/constants';
import styled from 'styled-components';

interface Props {
  isCompact?: boolean;
}

const ReadViewContainer = styled.div<Props>`
  display: flex;
  font-size: ${fontSize()}px;
  line-height: ${(gridSize() * 2.5) / fontSize()};
  max-width: 100%;
  min-height: ${(gridSize() * 2.5) / fontSize()}em;
  padding: ${(props) => (props.isCompact ? gridSize() / 2 : gridSize())}px
    ${gridSize() - 2}px;
  word-break: break-word;
`;

ReadViewContainer.displayName = 'ReadViewContainer';

export default ReadViewContainer;
