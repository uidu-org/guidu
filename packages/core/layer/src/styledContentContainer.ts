import styled from 'styled-components';

export default styled.div<{ maxHeight: number }>`
  [data-role='droplistContent'] {
    ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight}px` : '')};
  }
`;
