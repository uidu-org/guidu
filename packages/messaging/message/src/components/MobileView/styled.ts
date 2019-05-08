import styled from 'styled-components';

export const StyledMobileViewMessage = styled.div<{ reverse: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 0;
  zoom: 1;
  max-width: ${({ reverse }) => reverse ? '65%' : '85%'};
  background: ${({ reverse }) => reverse ? '#007aff' : '#f1f0f0'};
  color: ${({ reverse }) => reverse ? '#ffffff' : 'black'};
  padding: 6px 12px;
  border-radius: 1.3em;
  width: fit-content;
`

