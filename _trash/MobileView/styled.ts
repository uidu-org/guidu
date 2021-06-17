import styled from 'styled-components';

export const StyledMobileViewMessage = styled.div<{ reverse: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 0;
  zoom: 1;
  /* max-width: 85%; */
  background: ${({ reverse }) => (reverse ? '#dbeafd' : '#f1f2f3')};
  /* color: ${({ reverse }) => (reverse ? '#ffffff' : 'black')}; */
  padding: 0.5rem 0.75rem;
  border-radius: 0.35rem;
  width: fit-content;
`;
