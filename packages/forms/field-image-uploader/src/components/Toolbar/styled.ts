import styled from 'styled-components';

const StyledToolbar = styled.div<{ isHovered: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* TODO: make it dark-mode ready */
  background: #fff;
  opacity: ${({ isHovered }) => (isHovered ? 0.9 : 0)};
  transition: opacity 300ms ease-in;
`;

export default StyledToolbar;
