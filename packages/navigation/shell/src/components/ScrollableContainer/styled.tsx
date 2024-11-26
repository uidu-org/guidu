import styled from 'styled-components';

export const StyledScrollableContainer = styled.div`
  flex: 1 1 auto;
  scroll-behavior: smooth;
  overscroll-behavior: contain contain;
  overflow-x: hidden;
  overflow-y: auto;
  // to fix chrome flex
  min-width: 0;
  min-height: 0;
  position: relative;
`;

export const Shadow = styled.div<{ active: boolean; width: number }>`
  position: fixed;
  height: 10px;
  overflow: hidden;
  /* top: 0; */
  width: ${({ width }) => `${width}px`};
  z-index: 1;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 0;
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.3s ease-in-out;
    box-shadow: 0px 1px 9px 1px rgba(204, 204, 204, 0.8);
  }
`;
