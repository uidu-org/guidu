import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';

export default styled.div`
  display: inline-flex;
`;

export const GroupItem = styled.div`
  flex: 1 0 auto;
  display: flex;

  /* margins don't flip when the layout uses dir="rtl", whereas pseudos do */
  & + &::before {
    content: '';
    display: inline-block;
    width: ${gridSize() / 2}px;
  }
`;
