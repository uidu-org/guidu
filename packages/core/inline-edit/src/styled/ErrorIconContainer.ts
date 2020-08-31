import { gridSize } from '@uidu/theme/constants';
import styled from 'styled-components';

const ErrorIconContainer = styled.div`
  line-height: 100%;
  padding-right: ${gridSize() - 2}px;
`;

ErrorIconContainer.displayName = 'ErrorIconContainer';

export default ErrorIconContainer;
